import json

from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from events import serializers
from events import models
from events import permissions
from events.models import Event, EventSchedule, DummyEventOwner
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

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""
        id = self.request.user.id
        try:
            user = EventManager.objects.get(pk=id)
        except User.DoesNotExist:
            raise NotFound('A user with this id does not exist')
        serializer.save(event_manager=user)

    # def create(self, request, *args, **kwargs):
    #     id = self.request.user.id
    #     try:
    #         user = EventManager.objects.get(pk=id)
    #     except User.DoesNotExist:
    #         raise NotFound('A user with this id does not exist')
    #     serializer = self.get_serializer(data=request.data)
    #     if not serializer.is_valid(raise_exception=False):
    #         # res = ''
    #         # for value in serializer.errors.values():
    #         #     res = res + str(value[0])
    #         logger.error("Error in create an event")
    #         return Response({"Error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    #     serializer.save(event_manager=user)
    #     # headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_update(self, serializer):
        """Sets the user profile to the logged in user"""
        user = EventManager.objects.get(pk=self.request.user.id)
        serializer.save(event_manager=user)

    # def retrieve(self, request, *args, **kwargs):
    #     event_id = kwargs['pk']
    #     response = super(EventViewSet, self).retrieve(request, *args, **kwargs)
    #     try:
    #         suppliers = Supplier.objects.filter(event_id=event_id)
    #         response.data['suppliers'] = suppliers.values()
    #         event_schedule = EventSchedule.objects.filter(event_id=event_id)
    #         response.data['event_schedules'] = event_schedule.values()
    #         event_schedule = models.DummyEventOwner.objects.filter(event_id=event_id)
    #         response.data['event_owners'] = event_schedule.values()
    #     except:
    #         response.data["Error"] = "There was an error in the request"
    #         return Response(response, status=status.HTTP_400_BAD_REQUEST)
    #     return response


# -------------------DummyEventOwner-------------------

class DummyEventOwnerViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.DummyEventOwnerSerializer
    queryset = models.DummyEventOwner.objects.all().select_related(
        'event'
    )
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        IsAuthenticated,
    )

    def get_queryset(self, *args, **kwargs):
        return sub_event_get_queryset(self, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)
        if not is_many:
            return sub_event_create(self, request, *args, **kwargs)
        else:
            event_id = self.kwargs.get("event_pk")
            try:
                event = Event.objects.get(pk=event_id)
            except Event.DoesNotExist:
                raise NotFound('A event with this id does not exist')
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(event=event)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def put(self, request, *args, **kwargs):
        event_id = self.kwargs.get("event_pk")
        DummyEventOwner.objects.filter(event_id=event_id).delete()
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            raise NotFound('A event with this id does not exist')
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(event=event)
        list = []
        for event_owner in request.data:
            event_owner_new = DummyEventOwner.objects.create(**event_owner, event_id=event_id)
            list.append(event_owner_new)
        event.event_owners.set(list)
        event.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# -------------------DummySupplier-------------------

class DummySupplierViewSet(viewsets.ModelViewSet):
    """Handle creating, reading and updating profiles feed items"""
    serializer_class = serializers.DummySupplierSerializer
    queryset = models.DummySupplier.objects.all().select_related(
        'event'
    )
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        #  permissions.UpdateOwnEventSchedule,
        IsAuthenticated,
    )

    # def get_queryset(self, *args, **kwargs):
    #     event_id = self.kwargs.get("event_pk")
    #     try:
    #         event = Event.objects.get(pk=event_id)
    #     except Event.DoesNotExist:
    #         raise NotFound('A event with this id does not exist')
    #     return self.queryset.filter(event=event).values('id', 'name', 'phone', 'job', 'price', 'has_paid')

    def get_queryset(self, *args, **kwargs):
        return sub_event_get_queryset(self, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return sub_event_create(self, request, *args, **kwargs)


# -------------------EventSchedule-------------------

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
        return sub_event_get_queryset(self, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return sub_event_create(self, request, *args, **kwargs)


def sub_event_get_queryset(self, *args, **kwargs):
    event_id = self.kwargs.get("event_pk")
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        raise NotFound('A event with this id does not exist')
    return self.queryset.filter(event_id=event_id)


def sub_event_create(self, request, *args, **kwargs):
    event_id = self.kwargs.get("event_pk")
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        raise NotFound('A event with this id does not exist')
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
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
