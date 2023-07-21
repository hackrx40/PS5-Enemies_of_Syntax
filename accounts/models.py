from django.db import models

from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from rest_framework_simplejwt.tokens import RefreshToken
from phonenumber_field.modelfields import PhoneNumberField
from .ocr import get_gov_doc
from datetime import datetime as dt
# Create your models here.

def upload_path_handler(instance, filename):
    filetype = filename.split(".")[-1]
    return f"userprofilpics/{instance.username}.{filetype}"

def upload_gov_path_handler(instance, filename):
    filetype = filename.split(".")[-1]
    return f"govid/{instance.username}.{filetype}"

def upload_card_path_handler(instance, filename):
    filetype = filename.split(".")[-1]
    return f"card/{instance.username}.{filetype}"

class UserManager(BaseUserManager):

    def create_superuser(self, email, username, firstname, phonenumber, password=None, is_admin=True, is_staff=True):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.username = username
        user.firstname = firstname
        user.phonenumber = phonenumber
        user.verified = True
        user.admin = is_admin
        user.staff = is_staff
        user.save(using=self._db)
        return user
        
    def create_staffuser(self, email, username, firstname, phonenumber, password):
        user = self.create_superuser(
            email,
            username,
            firstname,
            phonenumber,
            password=password
        )
        user.admin = False
        user.save(using=self._db)
        return user

    def create_user(self, email, username, firstname, phonenumber, password):
        user = self.create_superuser(
            email,
            username,
            firstname,
            phonenumber,
            password
        )
        user.staff = False
        user.admin = False
        user.verified = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    genderchoices = (
        ("M", "Male"),
        ("F", "Female"),
        ("T", "Transgender"),
        ("O", "Other")
    )
    usertypechoices = (
        ("U", "Upper Class"),
        ("M", "Middle Class"),
        ("L", "Lower Class")
    )
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    username      = models.CharField(unique=True, max_length=100)
    firstname     = models.CharField(max_length=60)
    lastname      = models.CharField(max_length=60, null=True, blank=True)
    usertype      = models.CharField(max_length=20, choices=usertypechoices, default="M")
    dateofbirth   = models.DateField(null=True, blank=True)
    gender        = models.CharField(max_length=4, choices=genderchoices, blank=True)
    phonenumber   = PhoneNumberField(unique=True)
    profilepic    = models.ImageField(null=True, blank=True, upload_to=upload_path_handler, default="default.jpg")
    gov_id_num    = models.CharField(max_length=255, null=True, blank=True)
    gov_id_img    = models.ImageField(null=True, blank=True, upload_to=upload_gov_path_handler)
    card_img      = models.ImageField(null=True, blank=True, upload_to=upload_card_path_handler)
    points        = models.PositiveIntegerField(default=1000)
    verified      = models.BooleanField(default=True)
    active        = models.BooleanField(default=True)
    staff         = models.BooleanField(default=False)
    admin         = models.BooleanField(default=False)
    

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = ['email', 'firstname', 'phonenumber']

    objects = UserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin
    
    @property
    def is_active(self):
        return self.active
    
    @property
    def is_verified(self):
        return self.verified
    
    @property
    def get_usertype(self):
        return self.usertype

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
    
@receiver(post_save, sender=User)
def add_government_id(sender, instance, **kwargs):
    try:
        if instance.gov_id_num is None and instance.gov_id_img is not None:
            dob, number = get_gov_doc(instance.gov_id_img.path)
            formatted_dob = dt.strptime(dob, '%d/%m/%Y').strftime('%Y-%m-%d')
            instance.gov_id_num = number
            instance.dateofbirth = formatted_dob
            instance.save()
    except Exception as e:
        pass

    
class PhoneNumberVerify(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phonenumber = PhoneNumberField()
    otp = models.PositiveIntegerField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return str(self.user.username) + " " + str(self.phonenumber)
    
    @property
    def is_expired(self):
        return self.timestamp.timestamp() < dt.now().timestamp()