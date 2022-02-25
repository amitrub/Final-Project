from rest_framework import permissions

from profiles_api.models import UserProfileEventManager


class UpdateOwnProfile(permissions.BasePermission):
    """Allow user to edit their own profile"""

    def has_object_permission(self, request, view, obj):
        """Check user is trying to edit their own profile"""
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.id == request.user.id

class UpdateOwnEvent(permissions.BasePermission):
    """Allow users to update their own status"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        id = request.user.id
        return UserProfileEventManager.objects.filter(pk=id).exists()


    def has_object_permission(self, request, view, obj):
        """Check the user is trying to update their own status"""
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        return obj.event_manager.id == request.user.id

class UpdateOwnEventSchedule(permissions.BasePermission):
    """Allow users to update their own status"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        id = request.user.id
        return UserProfileEventManager.objects.filter(pk=id).exists()


    def has_object_permission(self, request, view, obj):
        """Check the user is trying to update their own status"""
        # if request.method in permissions.SAFE_METHODS:
        return True

# class UpdateOwnStatus(permissions.BasePermission):
#     """Allow users to update their own status"""
#
#     def has_object_permission(self, request, view, obj):
#         """Check the user is trying to update their own status"""
#         if request.method in permissions.SAFE_METHODS:
#             return True
#
#         return obj.user_profile.id == request.user.id