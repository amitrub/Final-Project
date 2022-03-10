
from django.db import models

from users.models import User


class Payment(models.Model):
    """Profile status update"""
    from_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='from_user',
        default= None
    )
    to_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='to_user',
        default=None
    )
    date = models.DateField()
    amount = models.PositiveIntegerField()


