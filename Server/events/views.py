from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from events import serializers
from events import models
from events import permissions
from events.models import Event
from users.models import EventManager
from rest_framework.response import Response


class EventViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventSerializer
    queryset = models.Event.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnEvent,
        IsAuthenticated,
    )

    def get_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        try:
            event_manager = EventManager.objects.get(pk=user_id)
        except EventManager.DoesNotExist:
            raise NotFound('A event manager with this id does not exist')
        return self.queryset.filter(event_manager=event_manager)


    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""
        id = self.request.user.id
        user = EventManager.objects.get(pk=id)
        serializer.save(event_manager=user)

    def perform_update(self, serializer):
        """Sets the user profile to the logged in user"""
        user = EventManager.objects.get(pk=self.request.user.id)
        serializer.save(event_manager=user)


class EventScheduleViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventScheduleSerializer
    queryset = models.EventSchedule.objects.all().select_related(
        'event'
    )
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnEventSchedule,
        IsAuthenticated,
    )

    def get_queryset(self, *args, **kwargs):
        event_id = self.kwargs.get("event_pk")
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            raise NotFound('A event with this id does not exist')
        return self.queryset.filter(event=event)

    def create(self, request, *args, **kwargs):
        event_id = self.kwargs.get("event_pk")
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            raise NotFound('A event with this id does not exist')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(event=event)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
