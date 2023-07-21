from django.urls import path
from .views import BudgetAPI, BudgetUDAPI, OCRAPI, AllCouponsAPI, RedeemCouponAPI

urlpatterns = [
    path('userbudget/', BudgetAPI.as_view(), name='Budgets'),
    path('userbudget/<int:pk>/', BudgetUDAPI.as_view(), name='Budgets RUD'),
    path('ocr/', OCRAPI.as_view(), name='OCR'),
    path('coupons/', AllCouponsAPI.as_view(), name='Coupons'),
    path('redeemcoupons/<int:pk>/', RedeemCouponAPI.as_view(), name='Redeem Coupons'),
]