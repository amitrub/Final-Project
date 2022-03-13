from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from meetings import serializers, models
from users.models import EventManager, User


class MeetingViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.MeetingSerializer
    queryset = models.Meetings.objects.all()
    authentication_classes = (TokenAuthentication,)


    def get_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        try:
            event_manager = EventManager.objects.get(pk=user_id)
        except EventManager.DoesNotExist:
            raise NotFound('A event manager with this id does not exist')
        return self.queryset.filter(event_manager=event_manager)


    def create(self, request, *args, **kwargs):
        id = self.request.user.id
        try:
            user = EventManager.objects.get(pk=id)
        except User.DoesNotExist:
            raise NotFound('A user with this id does not exist')
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid(raise_exception=False):
            res = ''
            for value in serializer.errors.values():
                res = value[0] + '\n'
            return Response({"Error": res}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save(event_manager=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
