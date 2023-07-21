from django.urls import path
from .views import BankAccountAPI, TransactionAPI

urlpatterns = [
    path('account/', BankAccountAPI.as_view(), name='Bank-Accounts'),
    path('transaction/', TransactionAPI.as_view(), name='Transactions'),
]