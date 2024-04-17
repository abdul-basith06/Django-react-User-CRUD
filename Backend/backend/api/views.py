from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView  # type: ignore

from .serializers import UserSerializer
from .models import *
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_admin'] = user.is_superuser
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):

    routes=[
        'api/token',
        'api/token/refresh'
    ]

    return Response(routes)


class RegisterView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
def userDetails(request,pk):
    try:
        user = User.objects.get(id=pk)
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response("User not found!",status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PUT'])
def userUpdate(request,pk):
    try:
        data=request.data
       
        user=User.objects.get(id=pk)
        serializer=UserSerializer(user,data=data, partial=True)
        if serializer.is_valid():
            if 'profile_img' in request.data:
                serializer.validated_data['profile_img'] = request.data['profile_img']
                
            serializer.save()
            return Response(serializer.data)
        else:
            print('error is hereeee')
            return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response("User not found!",status=status.HTTP_404_NOT_FOUND)    