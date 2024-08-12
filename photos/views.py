from rest_framework import permissions, generics
from .models import Feed
from .serializers import FeedSerializer
from rest_framework.exceptions import PermissionDenied

class ListCreateView(generics.ListCreateAPIView):
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            serializer.save(user=user)

class RetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
     queryset = Feed.objects.all()
     serializer_class = FeedSerializer
     permission_classes = [permissions.IsAuthenticated]
     lookup_field = "id"
     
     def perform_destroy(self, instance):
         user = self.request.user
         if user.is_authenticated and instance.user == user:
            return super().perform_destroy(instance)
         else:
            raise PermissionDenied("You do not have permission to delete this object.")
  
    

     




        
   
       