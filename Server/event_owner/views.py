from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from event_owner import serializers, models


class EventOwnerViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventOwnerSerializer
    queryset = models.EventOwner.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        IsAuthenticated,
    )