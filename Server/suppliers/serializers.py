# from rest_framework import serializers
#
# from suppliers import models
#
# from suppliers.models import Supplier
#
# # -------------------Suuplier-------------------
#
# class SupplierSerializer(serializers.ModelSerializer):
#     """Serializer profile feed items"""
#
#     event = serializers.SlugRelatedField(
#         read_only=True,
#         slug_field='event_name'
#     )
#
#     class Meta:
#         model = models.Supplier
#         fields = ('id', 'name', 'price', 'advance_pay', 'pay_method', 'event')
