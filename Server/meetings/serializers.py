from rest_framework import serializers

from meetings import models


class MeetingSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Meetings
        fields = ('id', 'description', 'date', 'time', 'event', 'location')
