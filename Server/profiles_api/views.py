from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated

from profiles_api import serializers
from profiles_api import models
from profiles_api import permissions
from profiles_api.models import UserProfileEventManager, Event

class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentiction tokens"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

class UserProfileEventManagerViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserProfileEventManagerSerializer
    queryset = models.UserProfileEventManager.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

class UserProfileEventOwnerViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserProfileEventOwnerSerializer
    queryset = models.UserProfileEventOwner.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)


class UserProfileSupplierViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserProfileSupplierSerializer
    queryset = models.UserProfileSupplier.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

class SupplierProductViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.SupplierProductSerializer
    queryset = models.SupplierProduct.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('supplier', 'product',)


class EventViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventSerializer
    queryset = models.Event.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnEvent,
        IsAuthenticated,
    )

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""
        id = self.request.user.id
        user = UserProfileEventManager.objects.get(pk=id)
        serializer.save(event_manager=user)


    def perform_update(self, serializer):
        """Sets the user profile to the logged in user"""
        user = UserProfileEventManager.objects.get(pk=self.request.user.id)
        serializer.save(event_manager=user)


class EventScheduleViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventScheduleSerializer
    queryset = models.EventSchedule.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnEventSchedule,
        IsAuthenticated,
    )

class EventOwnerViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventOwnerSerializer
    queryset = models.EventOwner.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnEventOwner,
        IsAuthenticated,
    )

class EventSupplierViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventSupplierSerializer
    queryset = models.EventSupplier.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnEventSupplier,
        IsAuthenticated,
    )

class PaymentViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.PaymentSerializer
    queryset = models.Payment.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.PaymentUpdate,
        IsAuthenticated,
    )