from django.conf.urls import url
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from users import views
from events import views as view_event

router = DefaultRouter()
router.register('user', views.UserViewSet)
# router.register('event_manager', views.EventManagerViewSet)
# router.register('event_owner', views.EventOwnerViewSet)
# router.register('supplier', views.SupplierViewSet)

app_name = 'user'

urlpatterns = [
    path('login/', views.UserLoginApiView.as_view(), name='login'),
    path('login_with_google/', views.UserLoginWithGoogleApiView.as_view(), name='login_with_google'),
    path('', include(router.urls), name='register'),
    url(r'^user/(?P<user_id>\d+)/event_manager', views.EventManagerAPIView.as_view(), name='event_manager'),
    url(r'^user/(?P<user_id>\d+)/event_owner', views.EventOwnerAPIView.as_view(), name='event_owner'),
    url(r'^user/(?P<user_id>\d+)/supplier', views.SupplierAPIView.as_view(), name='supplier'),
    url(r'^user/(?P<user_id>\d+)/event_schedules', view_event.EventScheduleToEventViewSet.as_view(), name='event_schedules'),
    # path('', include(user_types_router.urls)),
]
