from django.shortcuts import render

# Create your views here.

from .models import Comment
from .serializers import CommentSerializer
from rest_framework.generics import ListAPIView,CreateAPIView

class AddComment(CreateAPIView):
    queryset=Comment.objects.all()
    serializer_class = CommentSerializer

class GetComment(ListAPIView):
    queryset=Comment.objects.all()
    serializer_class = CommentSerializer