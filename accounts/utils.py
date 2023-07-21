from django.conf import settings
from django.core.mail import EmailMessage
import random

class Util:
    @staticmethod
    def send_email(data):
        
        email = EmailMessage(subject=data['email_subject'], body=data['email_body'],to=[data['to_email']],from_email=settings.EMAIL_HOST_USER)
        email.send()

    @staticmethod
    def generate_otp():
        otp = random.randint(10000000, 99999999)
        return otp