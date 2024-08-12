from rest_framework import serializers
from accounts.models import Account

from djoser.serializers import UserCreateSerializer as BaseUSerCreateSerializer
from djoser.serializers import UserSerializer as DjoserUserSerializer

class UserCreateSerializer(BaseUSerCreateSerializer):
    class Meta:
        model = Account
        fields = ['email', 'first_name', 'last_name', 'password', 're_password']


class CustomUserSerializer(DjoserUserSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'first_name', 'last_name', 'img')

  
