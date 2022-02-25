from django.urls import path, include

from rest_framework.routers import DefaultRouter

from profiles_api import views

router = DefaultRouter()
router.register('profile', views.UserProfileViewSet)
router.register('profile_supplier', views.UserProfileSupplierViewSet)
router.register('profile_event_manager', views.UserProfileEventManagerViewSet)
router.register('profile_event_owner', views.UserProfileEventOwnerViewSet)
router.register('event', views.EventViewSet)
router.register('event_schedule', views.EventScheduleViewSet)

urlpatterns = [
    path('login/', views.UserLoginApiView.as_view()),
    path('', include(router.urls))
]