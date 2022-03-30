from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from events import views

router = DefaultRouter()
router.register('events', views.EventViewSet)

event_sub_fields_router = routers.NestedDefaultRouter(
    router,
    r'events',
    lookup='event'
)

# meeting_router = routers.NestedDefaultRouter(
#     router,
#     r'events',
#     lookup='event'
# )

# event_sub_fields_router.register(
#     r'event_schedule',
#     views.EventScheduleViewSet,
#     basename='event-event_schedule_router'
# )

event_sub_fields_router.register(
    r'event_owner',
    views.DummyEventOwnerViewSet,
    basename='event-event_owner_router'
)

event_sub_fields_router.register(
    r'supplier',
    views.DummySupplierViewSet,
    basename='event-supplier_router'
)

# meeting_router.register(
#     r'meeting',
#     views.MeetingViewSet,
#     basename='event-meeting_router'
# )

app_name = 'events'
urlpatterns = [
    path('', include(router.urls)),
    path('', include(event_sub_fields_router.urls)),
    # path('', include(meeting_router.urls)),
]