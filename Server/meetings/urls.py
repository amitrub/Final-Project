from django.urls import path, include

from rest_framework.routers import DefaultRouter

from meetings import views

router = DefaultRouter()
router.register('meetings', views.MeetingViewSet)

app_name = 'meetings'

urlpatterns = [
    path('', include(router.urls))
]