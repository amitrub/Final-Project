from django.db.models import Q
from rest_framework import permissions

from payments.models import Payment


class UpdatePayments(permissions.BasePermission):
    """Allow user to edit their own profile"""

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        return True
