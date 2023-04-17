from django.contrib import admin
from django.urls import path, include

v1_urlpatterns = [
    path('', include('api.urls')),
]
urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/v1/', include(v1_urlpatterns)),
]
