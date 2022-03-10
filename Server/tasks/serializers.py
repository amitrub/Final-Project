from rest_framework import serializers

from tasks import models


class TaskSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Task
        fields = ('id','event_manager','task_name','deadline','description')
        extra_kwargs = {
            'event_manager': {
                'read_only': True
            }
        }

