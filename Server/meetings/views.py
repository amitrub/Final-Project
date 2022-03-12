from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from meetings import serializers, models


class MeetingViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.MeetingSerializer
    queryset = models.Meetings.objects.all()