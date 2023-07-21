from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
# for reseting password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str, smart_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.urls import reverse
from budget.models import BankAccount
from .utils import Util
from django.conf import settings
from datetime import datetime as dt
from datetime import timedelta

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'firstname', 'lastname', 'dateofbirth', 'gender', 'phonenumber']
    
    def save_user(self, validated_data):
        user = User.objects.create_user( 
                                password=validated_data.get('password'), 
                                email=validated_data.get('email'),
                                firstname=validated_data.get('firstname'),
                                username=validated_data.get('username'),
                                phonenumber=validated_data.get('phonenumber')
                                )
        user.gender = validated_data.get('gender')
        user.lastname = validated_data.get('lastname')
        user.dateofbirth = validated_data.get('dateofbirth')
        user.profilepic = validated_data.get('profilepic')
        user.save()
        return user

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'firstname', 'lastname', 'dateofbirth', 'gender', 'phonenumber', 'profilepic', 'gov_id_num', 'gov_id_img', 'card_img', 'points']

class VerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=666)
    otp = serializers.IntegerField()
    class Meta:
        model = User
        fields = ['token', 'otp']


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=100, min_length=3)
    password = serializers.CharField(max_length=255)
    tokens = serializers.CharField(max_length=68, min_length=8, read_only=True)

    class Meta:
        model=User
        fields = ['username', 'password', 'tokens']

    def validate(self, attrs):

        username = attrs.get('username','')
        password = attrs.get('password', '')

        filtered_user_by_email = User.objects.filter(username=username)
        auth_user = auth.authenticate(username=username, password=password)

        if not auth_user:
            raise AuthenticationFailed("Invalid credentials, try again")
        if not auth_user.is_active:
            raise AuthenticationFailed("Account Disabled, contact admin")
        if not auth_user.is_verified:
            raise AuthenticationFailed("Email not verified yet")

        tokens = RefreshToken.for_user(user=auth_user)
        account = BankAccount.objects.get(user=auth_user)
        user = User.objects.get(username=username)
        if user.last_login != dt.now().date():
            user.points = user.points + 1
        user.last_login = dt.now()
        user.save()
        return {
            'username': auth_user.username,
            'refresh': str(tokens),
            'access': str(tokens.access_token),
            'user_id': auth_user.pk,
            'user_type': auth_user.usertype,
            "account_id": account.pk
        }


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    # redirect_url = serializers.CharField(max_length=500, required=False)
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs['email']
        print(email)
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            #hashing the user id 
            token=PasswordResetTokenGenerator().make_token(user) 
            #this token becomes invalid once the user has reset the password
            relative_link = reverse('password-reset-confirm',kwargs={'uidb64':uidb64,'token':token})
            abs_url = settings.FRONT_END_HOST + relative_link
            email_body = "Hiii! Use link below to reset your password \n"+ abs_url
            data ={'email_body': email_body, 'email_subject': "reset your password",'to_email':user.email}
            print(data)
            Util.send_email(data)
        
        return super().validate(attrs)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)
            user.set_password(password)
            user.save()
            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')