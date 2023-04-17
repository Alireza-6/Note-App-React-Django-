from django.urls import path

from api.views import get_routes, get_notes, get_note

urlpatterns = [
    path('', get_routes, name="routes"),
    path('notes/', get_notes, name="notes"),
    path('notes/<int:pk>/', get_note, name="note"),
]
