from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView # type: ignore

urlpatterns = [
    path('',views.getRoutes),
    path('token/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view()),
    path('user-details/<int:pk>/',views.userDetails,name="user-details"),
]
