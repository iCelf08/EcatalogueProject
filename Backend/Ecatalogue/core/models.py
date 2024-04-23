from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    class ProductsObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='available')

    options = (
        ('non_available', 'Non-available'),
        ('available', 'Available'),
    )
    slug = models.SlugField(max_length=200, unique=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=600)
    created_at = models.DateTimeField(auto_now_add=True)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='catalogue_products')
    status = models.CharField(max_length=20, choices=options, default='available')

    objects = models.Manager()
    productsobjects = ProductsObjects()

    def __str__(self):
        return self.name
