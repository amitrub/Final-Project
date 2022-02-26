from rest_framework import permissions

from users.models import User


class UpdateOwnProfile(permissions.BasePermission):
    """Allow user to edit their own profile"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        return True


    def has_object_permission(self, request, view, obj):
        """Check user is trying to edit their own profile"""
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.pk == request.user.id
