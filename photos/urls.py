from django.urls import path
from .views import ListCreateView, RetrieveUpdateView

urlpatterns = [
    path('', ListCreateView.as_view()),
    path('<int:id>', RetrieveUpdateView.as_view()),
]
