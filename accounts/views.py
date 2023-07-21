from multiprocessing import AuthenticationError
from django.urls import reverse
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import (mixins, generics, status, permissions)
from rest_framework_simplejwt.tokens import RefreshToken
from django.http.response import HttpResponse, JsonResponse
import jwt
from rest_framework.views import APIView
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import (mixins, generics, status, permissions)
from rest_framework.response import Response
from .models import PhoneNumberVerify
from datetime import datetime, timedelta

#reseting password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode


# Create your views here.

from .utils import Util
from accounts.serializers import UserSerializer, VerificationSerializer, LoginSerializer, UserDataSerializer, ResetPasswordEmailRequestSerializer,SetNewPasswordSerializer, LogoutSerializer

User = get_user_model()

class SignUp(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer1 = UserSerializer(data=request.data)
        if serializer1.is_valid():
            user_data = serializer1.save_user(serializer1.data)
            token = RefreshToken.for_user(user_data).access_token
            relative_link = reverse('Verification')
            abs_url = settings.FRONT_END_HOST + relative_link + "user-id=" + str(token)
            email_body = "Hiii"+ user_data.firstname + " " + user_data.lastname + "! Use link below to verify your email \n"+ abs_url
            data ={'email_body': email_body, 'email_subject': "Verify your Email",'to_email':user_data.email}
            # Util.send_email(data)
            otp = Util.generate_otp()
            #send otp to phone number using twilio or any other service
            PhoneNumberVerify.objects.create(user=user_data, phonenumber=user_data.phonenumber, otp=otp, timestamp=datetime.now()+timedelta(days=1))
            return JsonResponse({'status': 'created', 'user_id': user_data.pk, 'token': str(token), 'otp': otp}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer1.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyCredentials(APIView):

    serializer_class = VerificationSerializer

    token_param_config = openapi.Parameter('token',in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description="Enter token here")
    otp_param_config = openapi.Parameter('otp',in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER, description="Enter otp here")

    @swagger_auto_schema(manual_parameters=[token_param_config, otp_param_config])
    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')
        otp = request.GET.get('otp')
        try:
            payload = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            phoneveri = PhoneNumberVerify.objects.get(user=user, otp=otp)
            if not user.is_verified:
                if phoneveri.is_expired:
                    return JsonResponse({'error':"OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
                user.verified = True
                user.active = True
                user.save()
            return JsonResponse({'status': 'Credentials Successfully Verified'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return JsonResponse({'error':"Activation Link for email has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return JsonResponse({'error':"Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)
        except PhoneNumberVerify.DoesNotExist as phne:
            return JsonResponse({'error':"Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)


class Login(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return JsonResponse(serializer.validated_data, status=status.HTTP_200_OK)
    
class UserProfileAPI(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    serializer_class = UserDataSerializer

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        data = {'request': request, 'email': request.data['email']}
        serializer = self.serializer_class(data=data)
        try: 
            validated = serializer.is_valid(raise_exception=True)
            return Response({'success': 'We have sent you a link to your email to reset your password'}, status=status.HTTP_200_OK)
        except:
            raise HttpResponse({'Invalid Request': status.HTTP_401_UNAUTHORIZED})



class PasswordTokenCheckAPI(generics.GenericAPIView):

    serializer_class = ResetPasswordEmailRequestSerializer

    def get(self,request,uidb64,token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return JsonResponse({'error':'Token is not valid, please request a new one'}, status = status.HTTP_401_UNAUTHORIZED)
            return JsonResponse({'success':True,'message':'Credentials Valid','uidb64':uidb64,'token':token}, status = status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return JsonResponse({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return JsonResponse({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message':'Logged out successfully'}, status=status.HTTP_204_NO_CONTENT)