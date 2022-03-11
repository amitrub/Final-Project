from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from events import views

router = DefaultRouter()
router.register('events', views.EventViewSet)

event_schedule_router = routers.NestedDefaultRouter(
    router,
    r'events',
    lookup='event'
)

meeting_router = routers.NestedDefaultRouter(
    router,
    r'events',
    lookup='event'
)

event_schedule_router.register(
    r'event_schedule',
    views.EventScheduleViewSet,
    basename='event-event_schedule_router'
)

meeting_router.register(
    r'meeting',
    views.MeetingViewSet,
    basename='event-meeting_router'
)

app_name = 'events'
urlpatterns = [
    path('', include(router.urls)),
    path('', include(event_schedule_router.urls)),
    path('', include(meeting_router.urls)),
]