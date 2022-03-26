from rest_framework import serializers

from event_owner.models import EventOwner
from event_owner.serializers import EventOwnerSerializer
from events import models

# -------------------Event-------------------
from events.models import Event, EventSchedule
from meetings.models import Meetings
from meetings.serializers import MeetingSerializer
from suppliers.models import Supplier
from suppliers.serializers import SupplierSerializer

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

class EventSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""
    # suppliers = SupplierSerializer(many=True, required=False)
    # meetings = MeetingSerializer(many=True, required=False)
    event_owners = EventOwnerSerializer(many=True, required=False)
    suppliers = SupplierSerializer(many=True, required=False)
    event_schedules = EventScheduleSerializer(many=True, required=False)

    class Meta:
        model = models.Event
        fields = ('id', 'event_manager', 'type', 'event_name', 'date', 'budget', 'location', 'event_owners','suppliers','event_schedules')
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
        print(validated_data)
        if 'event_owners' in validated_data:
            event_owners = validated_data.pop('event_owners')
            for event_owner in event_owners:
                event_owner_new = EventOwner.objects.create(**event_owner, event_id=event.id)
        if 'suppliers' in validated_data:
            suppliers = validated_data.pop('suppliers')
            for supplier in suppliers:
                Supplier.objects.create(event_id=event.id, **supplier)
        if 'event_schedules' in validated_data:
            event_sch = validated_data.pop('event_schedules')
            for schedule in event_sch:
                EventSchedule.objects.create(event_id=event.id, **schedule)
        print(event)
        return event




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
