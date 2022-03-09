from django.urls import path, include

from rest_framework.routers import DefaultRouter

from addresses import views

router = DefaultRouter()
router.register('addresses', views.AddressViewSet)

app_name = 'addresses'

urlpatterns = [
    path('', include(router.urls))
]