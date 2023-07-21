from rest_framework import serializers
from .models import Budget, BankAccount, Transaction, OCR, Coupons

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['user', 'account', 'name', 'start_date', 'end_date', 'limit', 'description', 'goal_amount', 'goal_img', 'recurrence']

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ['user', 'account_type', 'status', 'branch', 'facility', 'currency', 'exchange_rate', 'balance', 'ifsc', 'od_limit', 'opening_date', 'drawing_limit', 'micr_code', 'masked_account_no']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'account', 'category', 'transaction_type', 'amount', 'timestamp', 'description', 'narration', 'initial_balance', 'mode', 'bill_img']

class OCRSerializer(serializers.ModelSerializer):
    class Meta:
        model = OCR
        fields = ['image']

class CouponsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupons
        fields = ['pk', 'name', 'category', 'discount', 'expiry_date', 'value_points']

class CouponCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupons
        fields = ['coupon_code', 'expiry_date', 'value_points']