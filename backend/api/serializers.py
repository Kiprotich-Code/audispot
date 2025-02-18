from rest_framework import serializers
from .models import SliderImage

# serializers 
class SliderImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        max_length=None, use_url=True
    )
    class Meta:
        model = SliderImage
        fields =['id', 'title', 'image', 'uploaded_at' ]