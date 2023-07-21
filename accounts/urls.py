from django.urls import path
from .views import SignUp, Login, VerifyCredentials, UserProfileAPI, LogoutAPIView, RequestPasswordResetEmail, PasswordTokenCheckAPI, SetNewPasswordAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', SignUp.as_view(), name='Signup'),
    path('verify', VerifyCredentials.as_view(), name="Verification"),
    path('login/', Login.as_view(), name="Login"),\
    path('profile/', UserProfileAPI.as_view(), name="User-Profile"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('token-refresh/',TokenRefreshView.as_view(),name="RefreshToken"),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name = "password-reset-confirm"),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),name='password-reset-complete'),
]