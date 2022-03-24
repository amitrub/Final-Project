from rest_framework import serializers

from event_owner import models


class EventOwnerSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""
    class Meta:
        model = models.EventOwner
        fields = ('id', 'name', 'phone','event')
        # fields = '__all__'