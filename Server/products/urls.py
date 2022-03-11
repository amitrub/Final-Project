from django.conf.urls import url
from django.urls import path, include, re_path

from rest_framework.routers import DefaultRouter

from products import views

router = DefaultRouter()
router.register('products', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]