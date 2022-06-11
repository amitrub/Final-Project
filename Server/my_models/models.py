import itertools
from abc import ABC
from datetime import datetime, timedelta

import pytz
from rest_framework import serializers, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import exceptions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from events.models import Event
from users.models import EventManager
import logging

logger = logging.getLogger(__name__)


class MyModelViewSet(viewsets.ModelViewSet):

    def permission_denied(self, request, message=None, code=None):
        """
        If request is not permitted, determine what kind of exception to raise.
        """
        if request.authenticators and not request.successful_authenticator:
            raise exceptions.NotAuthenticated(detail={"Error": exceptions.NotAuthenticated.default_detail})
        raise exceptions.PermissionDenied(detail={"Error": exceptions.PermissionDenied.default_detail}, code=code)

    def list(self, request, *args, **kwargs):
        get_queryset = kwargs.get('queryset', self.get_queryset())
        queryset = self.filter_queryset(get_queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def event_queryset(self, *args, **kwargs):
        user_id = self.request.user.id
        try:
            event_manager = EventManager.objects.get(pk=user_id)
        except EventManager.DoesNotExist:
            logger.error("could not find user while adding an event")
            raise exceptions.NotFound(detail={"Error": 'A event manager with this id does not exist'})
        return self.queryset.filter(event_manager=event_manager)

    def sub_event_get_queryset(self, *args, **kwargs):
        event_id = self.kwargs.get("event_pk")
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            raise exceptions.NotFound(detail={"Error": 'A event with this id does not exist'})
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


class MySerializer(serializers.Serializer):

    def is_valid(self, raise_exception=False):
        valid_data = super().is_valid()
        if not valid_data and raise_exception:
            # raise exceptions.ValidationError(detail={"Error": " ".join(list(itertools.chain(*list(self.errors.values()))))})
            raise exceptions.ValidationError(
                detail={"Error": "Fields not filled properly - " + ", ".join(list(self.errors.keys()))})
        return valid_data


class MyModelSerializer(serializers.ModelSerializer):

    def is_valid(self, raise_exception=False):
        valid_data = super().is_valid()
        if not valid_data and raise_exception:
            raise exceptions.ValidationError(
                detail={"Error": "Fields not filled properly - " + ", ".join(list(self.errors.keys()))})
        return valid_data


class ObtainExpiringAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        if not created:
            # update the created time of the token to keep it valid
            token.created = datetime.utcnow()
            token.save()

        return Response({'token': token.key, 'id': token.user_id, 'name': token.user.name})


class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed(detail={"Error": 'Invalid token.'})

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed(detail={"Error": 'User inactive or deleted'})

        # This is required for the time comparison
        utc_now = datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)

        if token.created < utc_now - timedelta(hours=24):
            raise exceptions.AuthenticationFailed(detail={"Error": 'Token has expired'})

        return token.user, token
