
from django.contrib import admin
from django.urls import include, path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import routers
from django.conf import settings
from rest_framework_simplejwt.views import TokenRefreshView

from django.conf.urls.static import static
from core.views import ProductViewSet, CategoryViewSet, AuthenticateView, RegisterView, ProductSearch
from core.urls import router

schema_view = get_schema_view(
   openapi.Info(
      title="Ecatalogue",
      default_version='v1',
      description="swagger for Ecatalogue",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="elfarjichaimaa1@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register('products', ProductViewSet)
router.register('category', CategoryViewSet)



urlpatterns = [
   path('admin/', admin.site.urls),
   path('api/', include(router.urls)),
   path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   path('login/', AuthenticateView.as_view(), name='login'),
   path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('register/', RegisterView.as_view(), name='auth_register'),
   path("__reload__/", include("django_browser_reload.urls")),
   path("api-auth/", include('rest_framework.urls', namespace='rest_framework')),
   path('search/', ProductSearch.as_view(), name='product-search'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


