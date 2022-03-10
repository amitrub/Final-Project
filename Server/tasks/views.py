from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from tasks import serializers, models, permissions
from users.models import EventManager


class EventViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.TaskSerializer
    queryset = models.Task.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnTask,
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


from django.shortcuts import render

# Create your views here.
