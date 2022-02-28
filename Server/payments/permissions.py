from rest_framework import permissions

from events.models import Event
from users.models import EventManager, User


class UpdatePayment(permissions.BasePermission):
    """Allow users to update their own status"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        id = request.user.id
        return User.objects.filter(pk=id).exists()

    def has_object_permission(self, request, view, obj):
        """Check the user is trying to update their own status"""

        return obj.user.pk == request.user.id