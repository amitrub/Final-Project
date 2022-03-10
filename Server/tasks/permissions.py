from rest_framework import permissions

from users.models import EventManager


class UpdateOwnTask(permissions.BasePermission):
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