from rest_framework import serializers

from suppliers import models

# -------------------Suuplier-------------------
from suppliers.models import Supplier


class SupplierSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    event = serializers.SlugRelatedField(
        read_only=True,
        slug_field='event_name'
    )

    class Meta:
        model = models.Supplier
        fields = ('id', 'name', 'price', 'advance_pay', 'pay_method', 'event')
