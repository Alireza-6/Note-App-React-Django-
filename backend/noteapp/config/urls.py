from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

v1_urlpatterns = [
    path('', include('api.urls')),
]
urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/v1/', include(v1_urlpatterns)),
    path('', TemplateView.as_view(template_name="index.html")),
]
