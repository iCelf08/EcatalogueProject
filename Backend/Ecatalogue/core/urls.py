from rest_framework import routers

from .views import ProductViewSet, CategoryViewSet, AuthenticateView, RegisterView

router = routers.DefaultRouter()

urlpatterns = router.urls