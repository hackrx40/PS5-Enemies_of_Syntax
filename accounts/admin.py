from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework_simplejwt import token_blacklist
from .models import PhoneNumberVerify

# Register your models here.
class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)

User = get_user_model()

admin.site.register(User)
admin.site.register(PhoneNumberVerify)
admin.site.unregister(Group)