from django.db import models

# Create your models here.
from users.models import EventManager


class Task(models.Model):
    """Profile status update"""
    event_manager = models.ForeignKey(
        EventManager,
        on_delete=models.CASCADE,
        related_name='events',
    )
    task_name = models.CharField(max_length=255)
    deadline = models.DateField()
    description = models.CharField(max_length=255)

    def __str__(self):
        """Return the model as a string"""
        return self.description