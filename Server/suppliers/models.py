from django.db import models

# Create your models here.
from events.models import Event


class Supplier(models.Model):
    """Profile status update"""
    name = models.CharField(max_length=255)
    price = models.PositiveIntegerField()
    advance_pay = models.IntegerField(null=True, blank=True)
    pay_method = models.CharField(max_length=255, null=True, blank=True)
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='suppliers',
    )

    def __str__(self):
        """Return the model as a string"""
        return self.name
