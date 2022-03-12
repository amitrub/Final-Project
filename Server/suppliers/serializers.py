from rest_framework import serializers


from suppliers import models


# -------------------Suuplier-------------------

class SupplierSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Supplier
        fields = ('id', 'name', 'price', 'advance_pay', 'pay_method','event')
