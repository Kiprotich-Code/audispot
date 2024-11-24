from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageViewSet


# urls 
router = DefaultRouter()
router.register(r'slider_images', ImageViewSet, basename='slider_image')

urlpatterns = [
    path('', include(router.urls)),
]