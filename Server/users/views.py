from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.exceptions import NotFound

from users import serializers
from users import models
from users import permissions
from users.models import User


class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication tokens"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class UserViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

    def get_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        try:
            user = User.objects.get(id=user_id)
            if user.is_staff:
                return self.queryset

        except User.DoesNotExist:
            raise NotFound('A User with this id does not exist')
        return self.queryset.filter(id=user_id)

class EventManagerViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.EventManagerSerializer
    queryset = models.EventManager.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

    def get_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        try:
            user = User.objects.get(id=user_id)
            if user.is_staff:
                return self.queryset

        except User.DoesNotExist:
            raise NotFound('A User with this id does not exist')
        return self.queryset.filter(id=user_id)

class EventOwnerViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.EventOwnerSerializer
    queryset = models.EventOwner.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

    def get_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        try:
            user = User.objects.get(id=user_id)
            if user.is_staff:
                return self.queryset

        except User.DoesNotExist:
            raise NotFound('A User with this id does not exist')
        return self.queryset.filter(id=user_id)


class SupplierViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.SupplierSerializer
    queryset = models.Supplier.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

    def get_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        try:
            user = User.objects.get(id=user_id)
            if user.is_staff:
                return self.queryset

        except User.DoesNotExist:
            raise NotFound('A User with this id does not exist')
        return self.queryset.filter(id=user_id)