from django.db import models

# Create your models here.
from users.models import Supplier


class Product(models.Model):
    """Profile status update"""
    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.CASCADE,
        related_name='from_user',
        default= None
    )
    description = models.CharField(max_length=255)

    def __str__(self):
        """Return the model as a string"""
        return self.description
