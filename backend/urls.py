from django.urls import path

from . import views

urlpatterns = [
    path('create/', views.AddComment.as_view()),
    path('view/', views.GetComment.as_view()),
]