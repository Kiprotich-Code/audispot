from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import SliderImage
from .serializers import SliderImageSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class ImageViewSet(viewsets.ModelViewSet):
    queryset = SliderImage.objects.all()
    serializer_class = SliderImageSerializer
    
    # CREATE A NEW IMAGE 
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # RETRIEVE AN IMAGE 
    def retrieve(self, request, pk=None):
        try:
            image = SliderImage.objects.get(pk=pk)
            serializer = self.get_serializer(image)
            return Response(serializer.data)
        
        except SliderImage.DoesNotExist:
            return Response({"error": "Image not found."}, status=status.HTTP_404_NOT_FOUND)
        
    
    # DELETE AN IMAGE 
    def destroy(self, request, pk=None):
        try:
            image = SliderImage.objects.get(pk=pk)
            image.delete()
            return Response({"message": "Image deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except SliderImage.DoesNotExist:
            return Response({"error": "Image not found."}, status=status.HTTP_204_NO_CONTENT)
        
    # Update an image (PUT)
    def update(self, request, pk=None, *args, **kwargs):
        try:
            image = SliderImage.objects.get(pk=pk)
            serializer = self.get_serializer(image, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SliderImage.DoesNotExist:
            return Response({"error": "Image not found."}, status=status.HTTP_404_NOT_FOUND)

    # Partially update an image (PATCH)
    def partial_update(self, request, pk=None, *args, **kwargs):
        try:
            image = SliderImage.objects.get(pk=pk)
            serializer = self.get_serializer(image, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SliderImage.DoesNotExist:
            return Response({"error": "Image not found."}, status=status.HTTP_404_NOT_FOUND)