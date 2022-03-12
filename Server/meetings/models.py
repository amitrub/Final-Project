from django.db import models

# Create your models here.
from events.models import Event


class Meetings(models.Model):
    """Profile status update"""
    description = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    event = models.ManyToManyField(Event,
                                 related_name='meetings',
                                 null=True,
                                 blank=True)
    def __str__(self):
        """Return the model as a string"""
        return self.description
