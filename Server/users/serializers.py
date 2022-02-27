from rest_framework import serializers

from addresses.models import Address
from addresses.serializers import AddressSerializer
from users import models

# -------------------User-------------------
from users.models import User, EventManager, EventOwner, Supplier


class UserSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    address = AddressSerializer()

    class Meta:
        model = models.User
        fields = ('id', 'email', 'name', 'password', 'phone', 'address')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return new user"""
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            phone=validated_data['phone']
            )
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


