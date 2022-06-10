from datetime import datetime, timedelta

import pytz
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.settings import api_settings
from rest_framework.exceptions import NotFound, PermissionDenied, AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import APIException

from events.models import Event, DummySupplier, EventSchedule, DummyEventOwner
from my_models.models import ExpiringTokenAuthentication, ObtainExpiringAuthToken, MyModelViewSet
from users import serializers
from users import models
from users import permissions
from users.models import User, EventManager, EventOwner, Supplier


# -------------------Login-------------------
class UserLoginApiView(ObtainExpiringAuthToken):
    """Handle creating user authentication tokens"""
    serializer_class = serializers.AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


# -------------------LoginWithGoogle-------------------
class UserLoginWithGoogleApiView(ObtainExpiringAuthToken):
    """Handle creating user authentication tokens"""
    serializer_class = serializers.AuthTokenWithGoogleSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


# -------------------User-------------------
class UserViewSet(MyModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
    authentication_classes = (ExpiringTokenAuthentication,)
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
            raise NotFound(detail={"Error": 'A User with this id does not exist'})
        return self.queryset.filter(id=user_id)

    @action(detail=True, methods=['get'])
    def homepage(self, request, pk=None):
        if not str(request.user.id) == str(pk):
            raise PermissionDenied(detail={"Error": PermissionDenied.default_detail})

        event_manager = EventManager.objects.get(pk=pk)
        events = Event.objects.order_by('date').filter(event_manager=event_manager)[:3].values()
        for event in events:
            suppliers = DummySupplier.objects.filter(event_id=event['id'])
            event['suppliers'] = suppliers.values()
            event_schedule = EventSchedule.objects.filter(event_id=event['id'])
            event['event_schedules'] = event_schedule.values()
            event_schedule = DummyEventOwner.objects.filter(event_id=event['id'])
            event['event_owners'] = event_schedule.values()
        return Response({'events': events})


# -------------------EventManager-------------------
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
            raise NotFound(detail={"Error": 'A user with this id does not exist'})
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save(user=user)
        except Exception:
            return Response({'Error': "The user is already an event manager"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        """Delete an object"""
        try:
            event_manager = EventManager.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'Error': "A Event Manager with this id does not exist"},
                            status=status.HTTP_400_BAD_REQUEST)
        event_manager.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# TODO: Not in use yet
# -------------------EventOwner-------------------
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
            raise NotFound(detail={"Error": 'A user with this id does not exist'})
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=False)
        try:
            serializer.save(user=user)
        except Exception:
            return Response({'Error': "The user is already an event owner"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        """Delete an object"""
        try:
            event_owner = EventOwner.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'Error': "A Event Owner with this id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        event_owner.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# TODO: Not in use yet
# -------------------Supplier-------------------
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
            raise NotFound(detail={"Error": 'A user with this id does not exist'})
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=False)
        try:
            serializer.save(user=user)
        except Exception:
            return Response({'Error': "The user is already a supplier"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        """Delete an object"""
        try:
            supplier = Supplier.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'Error': "A supplier with this id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
