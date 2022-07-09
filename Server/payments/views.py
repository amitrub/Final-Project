from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from my_models.models import MyModelViewSet
from payments import models, serializers, permissions
from payments.models import Payment
from users.models import User


class PaymentViewSet(MyModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.PaymentSerializer
    queryset = models.Payment.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdatePayments,
        IsAuthenticated,
    )

    def get_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        return self.queryset.filter(Q(to_user=user_id) | Q(from_user=user_id))

    def create(self, request, *args, **kwargs):
        from_user = request.data['from_user']
        if str(request.user.id) != str(from_user):
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
