from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=250, unique=True)
    email = models.CharField(max_length=250, unique=True)
    password=models.CharField(max_length=250)
    occupation = models.CharField(max_length=250, null=True, blank=True)
    profile_img = models.ImageField(upload_to='profile', blank=True, null=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
