from django.urls import path

from api.views import get_routes

urlpatterns = [
    path('', get_routes, name="routes"),
]
