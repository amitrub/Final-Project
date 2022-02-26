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

event_schedule_router.register(
    r'event_schedule',
    views.EventScheduleViewSet,
    basename='event-event_schedule_router'
)
# router.register('event_schedule', views.EventScheduleViewSet)
app_name = 'events'
urlpatterns = [
    path('', include(router.urls)),
    path('', include(event_schedule_router.urls)),
]