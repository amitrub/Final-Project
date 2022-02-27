
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView

from users import serializers
from users import models
from users import permissions
from users.models import User, EventManager, EventOwner, Supplier


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


class EventManagerAPIView(APIView):
    serializer_class = serializers.EventManagerSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateTypeProfile,)

    def get(self, request, user_id):
        is_event_manager = EventManager.objects.filter(pk=user_id).exists()
        return Response({'is_event_manager': is_event_manager})

    def post(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise NotFound('A user with this id does not exist')
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        """Delete an object"""
        try:
            event_manager = EventManager.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise NotFound('A Event Manager with this id does not exist')
        event_manager.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EventOwnerAPIView(APIView):
    serializer_class = serializers.EventOwnerSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateTypeProfile,)

    def get(self, request, user_id):
        is_event_owner = EventOwner.objects.filter(pk=user_id).exists()
        return Response({'is_event_owner': is_event_owner})

    def post(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise NotFound('A user with this id does not exist')
        serializer = self.serializer_class(data=request.data)
        # serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        """Delete an object"""
        try:
            event_owner = EventOwner.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise NotFound('A Event Owner with this id does not exist')
        event_owner.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SupplierAPIView(APIView):
    serializer_class = serializers.SupplierSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateTypeProfile,)

    def get(self, request, user_id):
        is_event_owner = Supplier.objects.filter(pk=user_id).exists()
        try:
            supplier_type = Supplier.objects.get(pk=user_id).supplier_type
        except Supplier.DoesNotExist:
            supplier_type = None
        return Response({'is_supplier': is_event_owner, "supplier_type": supplier_type})

    def post(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise NotFound('A user with this id does not exist')
        serializer = self.serializer_class(data=request.data)
        # serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        """Delete an object"""
        try:
            supplier = Supplier.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise NotFound('A Event Owner with this id does not exist')
        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


