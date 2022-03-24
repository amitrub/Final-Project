from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from events import views
from suppliers import views as views1
router = DefaultRouter()
router.register('events', views.EventViewSet)
supplier_router = routers.NestedDefaultRouter(
    router,
    r'events',
    lookup='event'
)

supplier_router.register(
    r'supplier',
    views1.SupplierViewSet,
    basename='event-supplier_router'
)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(supplier_router.urls)),
]