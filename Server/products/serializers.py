from rest_framework import serializers


from products import models


# -------------------Address-------------------

class ProductSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Product
        fields = ('id', 'supplier', 'description')
