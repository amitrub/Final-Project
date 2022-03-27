from rest_framework import serializers

from addresses.models import Address
from addresses.serializers import AddressSerializer
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from users import models
from users.models import User, EventManager, EventOwner, Supplier


# -------------------Login-------------------
class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


# -------------------User-------------------


class UserSerializer(serializers.ModelSerializer):
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
        # user = User.objects.create_user(
        #     email=validated_data['email'],
        #     name=validated_data['name'],
        #     password=validated_data['password'],
        #     phone=validated_data['phone']
        # )
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
class EventManagerSerializer(serializers.ModelSerializer):
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
class EventOwnerSerializer(serializers.ModelSerializer):
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
class SupplierSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = models.Supplier
        fields = '__all__'
