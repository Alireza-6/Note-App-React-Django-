from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Note
from api.serializers import NoteSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def get_notes(request):
    notes = Note.objects.all().order_by("-updated")
    res = NoteSerializer(notes, many=True)
    return Response(res.data)


@api_view(['GET'])
def get_note(request, pk):
    notes = Note.objects.get(id=pk)
    res = NoteSerializer(notes)
    return Response(res.data)


@api_view(['PUT'])
def update_note(request, pk):
    note = get_object_or_404(Note, id=pk)
    serializer = NoteSerializer(data=request.data, instance=note)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
