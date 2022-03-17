from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from suppliers import serializers, models


class SupplierViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.SupplierSerializer
    queryset = models.Supplier.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        IsAuthenticated,
     )