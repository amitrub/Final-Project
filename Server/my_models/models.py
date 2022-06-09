from datetime import datetime, timedelta

import pytz
from rest_framework import serializers, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import APIException, ValidationError, AuthenticationFailed
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class MySerializer(serializers.ModelSerializer):

    def is_valid(self, raise_exception=False):
        valid_data = super().is_valid()
        if not valid_data and raise_exception:
            raise ValidationError(detail={"Error": self.errors})
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
            raise AuthenticationFailed('Invalid token.')

        if not token.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        # This is required for the time comparison
        utc_now = datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)

        if token.created < utc_now - timedelta(hours=24):
            raise AuthenticationFailed('Token has expired')

        return token.user, token
