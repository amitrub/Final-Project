from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from products import models, serializers, permissions
from payments.models import Payment
from users.models import User


class ProductViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.Payment,
        IsAuthenticated,
    )

    def create(self, request, *args, **kwargs):
        supplier = request.data['supplier']
        if str(request.user.id) != str(supplier):
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


from django.shortcuts import render

# Create your views here.
