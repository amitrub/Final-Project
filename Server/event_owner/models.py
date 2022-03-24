from django.db import models

# Create your models here.
from events.models import Event


class EventOwner(models.Model):
    """Profile status update"""
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    event = models.ForeignKey(Event,
                            on_delete=models.CASCADE,
                            related_name='event',
                            default=None)
