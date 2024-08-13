from rest_framework import permissions, generics
from .models import Feed, Comment
from .serializers import FeedSerializer, CommentSerializer
from rest_framework.exceptions import PermissionDenied,  NotFound

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
  
    
class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        feed_id = self.request.data.get('feed_id')  # Assuming 'feed_id' is sent in the POST data
        try:
            feed = Feed.objects.get(id=feed_id)
        except Feed.DoesNotExist:
            raise NotFound("Feed not found")

        user = self.request.user
        serializer.save(user=user, feed=feed)

class CommentRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
     queryset = Comment.objects.all()
     serializer_class = CommentSerializer
     permission_classes = [permissions.IsAuthenticated]
     lookup_field = "id"
     
     def perform_destroy(self, instance):
         user = self.request.user
         feed_owner = instance.feed.user  
        
         if user.is_authenticated and (instance.user == user or feed_owner == user):
            return super().perform_destroy(instance)
         else:
            raise PermissionDenied("You do not have permission to delete this object.")
  
    
     




        
   
       