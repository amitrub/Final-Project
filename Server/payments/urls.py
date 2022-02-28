from django.urls import path, include

from rest_framework.routers import DefaultRouter

from payments import views

router = DefaultRouter()
router.register('payment', views.PaymentViewSet)

urlpatterns = [
    path('', include(router.urls))
]