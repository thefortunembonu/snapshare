from django.urls import path
from .views import ListCreateView,CommentListCreateView, RetrieveUpdateView,CommentRetrieveUpdateView

urlpatterns = [
    path('', ListCreateView.as_view()),
    path('<int:id>', RetrieveUpdateView.as_view()),
    path('comments', CommentListCreateView.as_view()),
    path('comment/<int:id>', CommentRetrieveUpdateView.as_view()),
]
