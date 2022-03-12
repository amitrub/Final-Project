from rest_framework import serializers

from events import models


# -------------------Event-------------------

class EventSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Event
        # fields = ('id', 'event_manager', 'type', 'event_name', 'date', 'budget')
        fields = '__all__'
        extra_kwargs = {
            'event_manager': {
                'read_only': True
            }
        }


# -------------------EventSchedule-------------------

class EventScheduleSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    event = serializers.SlugRelatedField(
        read_only=True,
        slug_field='event_name'
    )

    class Meta:
        model = models.EventSchedule
        fields = ('id', 'event', 'start_time', 'end_time', 'description')
        # fields = '__all__'


class MeetingSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    event = serializers.SlugRelatedField(
        read_only=True,
        slug_field='event_name'
    )

    class Meta:
        model = models.Meeting
        fields = ('id', 'event', 'date', 'description', 'time')
        # fields = '__all__'
