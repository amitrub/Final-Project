from rest_framework import serializers

from users import models

# -------------------User-------------------
from users.models import User, EventManager, EventOwner, Supplier


class UserSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.User
        fields = ('id', 'email', 'name', 'password', 'phone')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }
    def create(self, validated_data):
        """Create and return new user"""
        user = models.User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            phone=validated_data.get("phone")

        )

        return user

    def update(self, instance, validated_data):
        """Handle updating user account"""
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super().update(instance, validated_data)


class EventManagerSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = models.EventManager
        fields = '__all__'

class EventOwnerSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = models.EventOwner
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    user = serializers.SlugRelatedField(
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = models.Supplier
        fields = '__all__'


