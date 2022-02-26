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

# -------------------EventManager-------------------

class EventManagerSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    user = UserSerializer(required=True)

    class Meta:
        model = models.EventManager
        fields = ('user',)

    def create(self, validated_data):
        """Create and return new user"""
        if 'user_id' in validated_data:
            user_id = validated_data.pop('user_id')
            user = User.objects.get(pk=user_id)
        elif 'user' in validated_data:
            user_data = validated_data.pop('user')
            user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        event_manager, created = EventManager.objects.update_or_create(user=user)
        return event_manager

    # def update(self, instance, validated_data):
    #     """Handle updating user account"""
    #     user = instance.user
    #     event_manager, created = EventManager.objects.update_or_create(user=user)
    #     return event_manager
    #     # return UserSerializer().update(instance.user, validated_data)



# -------------------EventOwner-------------------

class EventOwnerSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    user = UserSerializer(required=True)

    class Meta:
        model = models.EventOwner
        fields = ('user',)

    def create(self, validated_data):
        """Create and return new user"""
        if 'user_id' in validated_data:
            user_id = validated_data.pop('user_id')
            user = User.objects.get(id=user_id)
        elif 'user' in validated_data:
            user_data = validated_data.pop('user')
            user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        event_owner, created = EventOwner.objects.update_or_create(user=user)
        return event_owner

    # def update(self, instance, validated_data):
    #     """Handle updating user account"""
    #     if 'password' in validated_data:
    #         password = validated_data.pop('password')
    #         instance.set_password(password)
    #
    #     return super().update(instance, validated_data)

# -------------------Supplier-------------------

class SupplierSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    user = UserSerializer(required=True)

    class Meta:
        model = models.Supplier
        fields = ('user', 'supplier_type')

    def create(self, validated_data):
        """Create and return new user"""
        if 'user_id' in validated_data:
            user_id = validated_data.pop('user_id')
            user = User.objects.get(id=user_id)
        elif 'user' in validated_data:
            user_data = validated_data.pop('user')
            user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        supplier, created = Supplier.objects.update_or_create(user=user)
        return supplier

    # def update(self, instance, validated_data):
    #     """Handle updating user account"""
    #     if 'password' in validated_data:
    #         password = validated_data.pop('password')
    #         instance.set_password(password)
    #
    #     return super().update(instance, validated_data)

