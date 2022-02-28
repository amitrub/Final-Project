from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from payments import models, serializers, permissions
from users.models import User


class PaymentViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.PaymentSerializer
    queryset = models.Payment.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdatePayment,
        IsAuthenticated,
    )


