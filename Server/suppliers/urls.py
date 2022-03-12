from django.urls import path, include

from rest_framework.routers import DefaultRouter

from addresses import views

router = DefaultRouter()
router.register('suppliers', views.AddressViewSet)

app_name = 'suppliers'

urlpatterns = [
    path('', include(router.urls))
]