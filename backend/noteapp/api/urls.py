from django.urls import path

from api.views import (
    get_routes,
    get_notes,
    get_note,
    update_note,
    delete_note,
    create_note,
)

urlpatterns = [
    path('', get_routes, name="routes"),
    path('notes/', get_notes, name="notes"),
    path('notes/create/', create_note, name="create-note"),
    path('notes/<int:pk>/update/', update_note, name="update-note"),
    path('notes/<int:pk>/delete/', delete_note, name="delete-note"),
    path('notes/<int:pk>/', get_note, name="note"),
]
