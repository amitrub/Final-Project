from django.urls import path, include

from rest_framework.routers import DefaultRouter

from suppliers import views

router = DefaultRouter()
router.register('suppliers', views.SupplierViewSet)

app_name = 'suppliers'

urlpatterns = [
    path('', include(router.urls))
]