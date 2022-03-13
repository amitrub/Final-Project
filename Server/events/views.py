import json

from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from events import serializers
from events import models
from events import permissions
from events.models import Event
from users.models import EventManager
from rest_framework.response import Response

import logging
logger = logging.getLogger(__name__)

class EventViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventSerializer
    queryset = models.Event.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnEvent,
        IsAuthenticated,
    )

    def get_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        try:
            event_manager = EventManager.objects.get(pk=user_id)
        except EventManager.DoesNotExist:
            logger.error("could not find user while adding an event")
            raise NotFound('A event manager with this id does not exist')
        return self.queryset.filter(event_manager=event_manager)


    # def perform_create(self, serializer):
    #     """Sets the user profile to the logged in user"""
    #     id = self.request.user.id
    #     user = EventManager.objects.get(pk=id)
    #     serializer.save(event_manager=user)

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
            logger.error("Error in create an event")
            return Response({"Error": res}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save(event_manager=user)
        # headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_update(self, serializer):
        """Sets the user profile to the logged in user"""
        user = EventManager.objects.get(pk=self.request.user.id)
        serializer.save(event_manager=user)

    # def retrieve(self, request, *args, **kwargs):
    #     id = kwargs['pk']
    #     event = Event.objects.filter(pk = id)
    #     data = event.values()
    #     meetings = Meeting.objects.filter(event__id=id)
    #     data['meetings'] = meetings.values()
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid()
    #     # response = serializer.data
    #     # response.update({'meetings': meetings})
    #     return Response(data, status=status.HTTP_200_OK)

class EventScheduleViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.EventScheduleSerializer
    queryset = models.EventSchedule.objects.all().select_related(
        'event'
    )
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        permissions.UpdateOwnEventSchedule,
        IsAuthenticated,
    )

    def get_queryset(self, *args, **kwargs):
        event_id = self.kwargs.get("event_pk")
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            raise NotFound('A event with this id does not exist')
        return self.queryset.filter(event=event)

    def create(self, request, *args, **kwargs):
        event_id = self.kwargs.get("event_pk")
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            raise NotFound('A event with this id does not exist')
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid(raise_exception=False):
            res = ''
            for value in serializer.errors.values():
                res = value[0] + '/n'
            return Response({"Error": res}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save(event=event)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# class MeetingViewSet(viewsets.ModelViewSet):
#     """Handle creating, reading and updating profiles feed items"""
#     serializer_class = serializers.MeetingSerializer
#     queryset = models.Meeting.objects.all().select_related(
#         'event'
#     )
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (
#         permissions.UpdateOwnMeeting,
#         IsAuthenticated,
#     )
#
#     def get_queryset(self, *args, **kwargs):
#         event_id = self.kwargs.get("event_pk")
#         try:
#             event = Event.objects.get(pk=event_id)
#         except Event.DoesNotExist:
#             raise NotFound('A event with this id does not exist')
#         return self.queryset.filter(event=event)
#
#     def create(self, request, *args, **kwargs):
#         event_id = self.kwargs.get("event_pk")
#         try:
#             event = Event.objects.get(pk=event_id)
#         except Event.DoesNotExist:
#             raise NotFound('A event with this id does not exist')
#         serializer = self.get_serializer(data=request.data)
#         if not serializer.is_valid(raise_exception=False):
#             res = ''
#             for value in serializer.errors.values():
#                 res = value[0] + '/n'
#             return Response({"Error": res}, status=status.HTTP_400_BAD_REQUEST)
#         serializer.save(event=event)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)