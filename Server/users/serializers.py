from abc import ABC

import requests
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from addresses.models import Address
from addresses.serializers import AddressSerializer
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from users import models
from users.models import User, EventManager, EventOwner, Supplier
from my_models.models import MyModelSerializer, MySerializer


# -------------------Login-------------------
class AuthTokenSerializer(MySerializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email').lower()
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = 'Unable to authenticate with provided credentials'
            raise ValidationError(detail=msg)

        attrs['user'] = user
        return attrs


# -------------------LoginWithGoogle-------------------
class AuthTokenWithGoogleSerializer(MySerializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    access_token = serializers.CharField()

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        access_token = attrs.get('access_token')
        url = 'https://www.googleapis.com/userinfo/v2/me'
        headers = {
            "Authorization": f'Bearer {access_token}'
        }
        result = requests.get(url=url, headers=headers)
        result_json = result.json()

        # {
        #     "id": "109599329927112222200",
        #     "email": "amitrubin21@gmail.com",
        #     "verified_email": true,
        #     "name": "עמית רובין",
        #     "given_name": "עמית",
        #     "family_name": "רובין",
        #     "picture": "https://lh3.googleusercontent.com/a/AATXAJwODH7MpGDabOMZKn3LnXbQBSvZlCird65EVl4t=s96-c",
        #     "locale": "he"
        # }

        # {
        #     "error": {
        #         "code": 401,
        #         "message": "Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.",
        #         "status": "UNAUTHENTICATED"
        #     }
        # }

        if "error" in result_json:
            msg = _(result_json["error"]["message"])
            raise ValidationError(msg, code='authorization')

        google_email = result_json["email"]
        verified_email = result_json["verified_email"]
        name = result_json["name"]

        if not email == google_email or not verified_email:
            msg = _('Unable to authenticate with provided credentials')
            raise ValidationError(msg, code='authorization')

        email = email.lower()
        if not User.objects.filter(email=email).exists():
            # TODO: Create user from Google
            # "https://www.googleapis.com/calendar/v3/users/me/calendarList"
            # 'https://people.googleapis.com/v1/people/me?personFields=birthdays,addresses,phoneNumbers,genders'
            # result = requests.get(url='https://people.googleapis.com/v1/people/me?personFields=addresses,phoneNumbers',
            #                       headers=headers)
            # result_json = result.json()
            # print(result_json)
            user = User.objects.create_user(email, name, '1234', "")
            Address.objects.create(user=user, country='', city='', street='', number=0)

        user = User.objects.get(email=email)

        attrs['user'] = user
        return attrs


# -------------------User-------------------


class UserSerializer(MyModelSerializer):
    """Serializes a user profile object"""

    address = AddressSerializer()

    class Meta:
        model = models.User
        fields = ('id', 'email', 'name', 'password', 'phone', 'address')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 2,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return new user"""
        user = User.objects.create_user(**validated_data)
        if 'address' in validated_data:
            address_data = validated_data.pop('address')
            Address.objects.create(user=user, **address_data)
        return user

    def update(self, instance, validated_data):
        """Handle updating user account"""
        if 'address' in validated_data:
            address_data = validated_data.pop('address')
            try:
                if instance.address:
                    address = instance.address
                    address.country = address_data.get('country', address.country)
                    address.city = address_data.get('city', address.city)
                    address.street = address_data.get('street', address.street)
                    address.number = address_data.get('number', address.number)
                    address.save()
                else:
                    Address.objects.create(user=instance, **address_data)
            except:
                Address.objects.create(user=instance, **address_data)
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super().update(instance, validated_data)


# -------------------EventManager-------------------
class EventManagerSerializer(MyModelSerializer):
    """Serializer profile feed items"""

    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = models.EventManager
        fields = '__all__'


# TODO: Not in use yet
# -------------------Supplier-------------------
class EventOwnerSerializer(MyModelSerializer):
    """Serializer profile feed items"""

    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = models.EventOwner
        fields = '__all__'


# TODO: Not in use yet
# -------------------Supplier-------------------
class SupplierSerializer(MyModelSerializer):
    """Serializer profile feed items"""

    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = models.Supplier
        fields = '__all__'
