from django.shortcuts import get_object_or_404, render
from requests import Response
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
from rest_framework.permissions import AllowAny
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from .models import Product, Category
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import AuthenticateSerializer, ProductSerializer, CategorySerializer, RegisterSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import filters




class AuthenticateView(TokenObtainPairView):
    serializer_class = AuthenticateSerializer
    permission_classes = [AllowAny]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_image(self, request, pk=None):
        product = self.get_object()
        file = request.FILES.get('image')
        if not file:
            return Response({'message': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        product.image = file
        product.save()
        return Response({'message': 'Image uploaded successfully'}, status=status.HTTP_200_OK)
        
    def get_object(self,queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Product, id=item)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        category_id = self.kwargs.get('pk')
        if category_id is not None:
            return Category.objects.filter(id=category_id).prefetch_related('product_set')
        else:
            return Category.objects.all() 



 
 
class ProductDetailFilter(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['^name']
    
class ProductSearch(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name'] 

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('name', None)
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)  
        return queryset