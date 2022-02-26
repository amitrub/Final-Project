from django.urls import path, include

from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register('user', views.UserViewSet)
router.register('event_manager', views.EventManagerViewSet)
router.register('event_owner', views.EventOwnerViewSet)
router.register('supplier', views.SupplierViewSet)

urlpatterns = [
    path('login/', views.UserLoginApiView.as_view()),
    path('', include(router.urls))
]