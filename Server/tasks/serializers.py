from rest_framework import serializers

from tasks import models


class TaskSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Task
        fields = '__all__'
        extra_kwargs = {
            'event_manager': {
                'read_only': True
            }
        }

