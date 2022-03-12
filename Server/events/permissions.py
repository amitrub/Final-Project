from rest_framework import permissions

from events.models import Event
from users.models import EventManager


class UpdateOwnEvent(permissions.BasePermission):
    """Allow users to update their own status"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        id = request.user.id
        return EventManager.objects.filter(pk=id).exists()

    def has_object_permission(self, request, view, obj):
        """Check the user is trying to update their own status"""
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        return obj.event_manager.pk == request.user.id


class UpdateOwnEventSchedule(permissions.BasePermission):
    """Allow users to update their own status"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        event_pk = view.kwargs.get("event_pk")
        event = Event.objects.get(id=int(event_pk))
        return event.event_manager.pk == request.user.id

    def has_object_permission(self, request, view, obj):
        """Check the user is trying to update their own status"""
        event_id = obj.event_id
        event = Event.objects.get(id=event_id)
        return event.event_manager.pk == request.user.id


class UpdateOwnMeeting(permissions.BasePermission):
    """Allow users to update their own status"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        event_pk = view.kwargs.get("event_pk")
        event = Event.objects.get(id=int(event_pk))
        return event.event_manager.pk == request.user.id

    def has_object_permission(self, request, view, obj):
        """Check the user is trying to update their own status"""
        event_id = obj.event_id
        event = Event.objects.get(id=event_id)
        return event.event_manager.pk == request.user.id
