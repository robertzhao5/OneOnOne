from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

from P2.accounts.views import ChangePasswordView, RegisterView, UserProfileView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/change-password/', ChangePasswordView.as_view(),
         name='change_password'),
]
