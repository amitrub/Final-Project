from rest_framework import serializers

from profiles_api import models


# -------------------User-------------------

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'name', 'password', 'phone')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return new user"""
        user = models.UserProfile.objects.create_user(
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

class UserProfileEventManagerSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.UserProfileEventManager
        fields = ('id', 'email', 'name', 'password', 'phone')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return new user"""
        user = models.UserProfileEventManager.objects.create_user(
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


# -------------------EventOwner-------------------

class UserProfileEventOwnerSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.UserProfileEventOwner
        fields = ('id', 'email', 'name', 'password', 'phone')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return new user"""
        user = models.UserProfileEventOwner.objects.create_user(
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


# -------------------Supplier-------------------

class UserProfileSupplierSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.UserProfileSupplier
        fields = ('id', 'email', 'name', 'password', 'phone', 'supplier_type')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return new user"""
        user = models.UserProfileSupplier.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            phone=validated_data['phone'],
            supplier_type=validated_data['supplier_type']
        )

        return user

    def update(self, instance, validated_data):
        """Handle updating user account"""
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super().update(instance, validated_data)


# -------------------SupplierProduct-------------------

class SupplierProductSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.SupplierProduct
        fields = ('supplier', 'product')


# -------------------Event-------------------

class EventSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Event
        fields = ('id', 'event_manager', 'type', 'date', 'budget')
        extra_kwargs = {
            'event_manager': {
                'read_only': True
            }
        }


# -------------------EventSchedule-------------------

class EventScheduleSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.EventSchedule
        fields = ('id', 'event', 'start_time', 'end_time', 'description')


# -------------------EventOwner-------------------

class EventOwnerSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.EventOwner
        fields = ('id', 'event_owner', 'event')
        extra_kwargs = {
            'event': {
                'read_only': True
            }
        }


# -------------------EventSupplier-------------------

class EventSupplierSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.EventOwner
        fields = ('id', 'event_owner', 'event')
        extra_kwargs = {
            'event': {
                'read_only': True
            }
        }

# -------------------Payment-------------------

class PaymentSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Paymenr
        fields = ('id', 'from_user', 'to_user', 'date', 'amount')
