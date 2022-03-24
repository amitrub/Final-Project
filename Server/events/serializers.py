from rest_framework import serializers

from event_owner.models import EventOwner
from event_owner.serializers import EventOwnerSerializer
from events import models

# -------------------Event-------------------
from events.models import Event
from meetings.models import Meetings
from meetings.serializers import MeetingSerializer
from suppliers.models import Supplier
from suppliers.serializers import SupplierSerializer


class EventSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""
    # suppliers = SupplierSerializer(many=True, required=False)
    # meetings = MeetingSerializer(many=True, required=False)
    event_owners = EventOwnerSerializer(many=True, required=False)

    class Meta:
        model = models.Event
        fields = ('id', 'event_manager', 'type', 'event_name', 'date', 'budget', 'location', 'event_owners')
        # fields = '__all__'
        extra_kwargs = {
            'event_manager': {
                'read_only': True
            }
        }

    def create(self, validated_data):
        """Create and return new user"""
        event = Event.objects.create(
            event_manager=validated_data['event_manager'],
            type=validated_data['type'],
            event_name=validated_data['event_name'],
            date=validated_data['date'],
            budget=validated_data['budget'],
            location=validated_data['location'],
        )
        if 'event_owners' in validated_data:
            event_owners = validated_data.pop('event_owners')
            print(event_owners)
            for event_owner in event_owners:
                event_owner_new = EventOwner.objects.create(**event_owner, event_id=event.id)
        # if 'meetings' in validated_data:
        #     meetings = validated_data.pop('meetings')
        #     for meeting in meetings:
        #         meeting_new = Meetings.objects.create(event_manager=validated_data['event_manager'], **meeting)
        #         meeting_new.event.add(event)
        return event


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

# class MeetingSerializer(serializers.ModelSerializer):
#     """Serializer profile feed items"""
#
#     event = serializers.SlugRelatedField(
#         read_only=True,
#         slug_field='event_name'
#     )
#
#     class Meta:
#         model = models.Meeting
#         fields = ('id', 'event', 'date', 'description', 'time')
#         # fields = '__all__'
