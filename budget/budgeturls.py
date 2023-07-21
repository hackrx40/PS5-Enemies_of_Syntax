from django.urls import path
from .views import BudgetAPI, BudgetUDAPI

urlpatterns = [
    path('userbudget/', BudgetAPI.as_view(), name='Budgets'),
    path('userbudget/<int:pk>/', BudgetUDAPI.as_view(), name='Budgets RUD'),
    # path('ocr/', OCRAPI.as_view(), name='OCR'),
]