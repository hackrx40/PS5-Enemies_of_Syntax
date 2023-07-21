from django.contrib import admin
from .models import Budget, BankAccount, Transaction, OCR, Coupons
# Register your models here.

admin.site.register(Budget)
admin.site.register(BankAccount)
admin.site.register(Transaction)
admin.site.register(OCR)
admin.site.register(Coupons)