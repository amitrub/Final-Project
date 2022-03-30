# from django.shortcuts import render
#
# # Create your views here.
# from rest_framework import viewsets, status
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.exceptions import NotFound
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
#
# from events.models import Event
# from suppliers import serializers, models
#
#
# class SupplierViewSet(viewsets.ModelViewSet):
#     """Handle creating, reading and updating profiles feed items"""
#     serializer_class = serializers.SupplierSerializer
#     queryset = models.Supplier.objects.all().select_related(
#         'event'
#     )
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (
#       #  permissions.UpdateOwnEventSchedule,
#         IsAuthenticated,
#     )
#
#     def get_queryset(self, *args, **kwargs):
#         event_id = self.kwargs.get("event_pk")
#         try:
#             event = Event.objects.get(pk=event_id)
#         except Event.DoesNotExist:
#             raise NotFound('A event with this id does not exist')
#         return self.queryset.filter(event=event)
#
#     def create(self, request, *args, **kwargs):
#         event_id = self.kwargs.get("event_pk")
#         try:
#             event = Event.objects.get(pk=event_id)
#         except Event.DoesNotExist:
#             raise NotFound('A event with this id does not exist')
#         serializer = self.get_serializer(data=request.data)
#         if not serializer.is_valid(raise_exception=False):
#             res = ''
#             for value in serializer.errors.values():
#                 res = value[0] + '/n'
#             return Response({"Error": res}, status=status.HTTP_400_BAD_REQUEST)
#         serializer.save(event=event)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
#     # authentication_classes = (TokenAuthentication,)
#     #     # permission_classes = (
#     #     #     permissions.UpdateOwnAddress,
#     #     #     IsAuthenticated,
#     #     # )