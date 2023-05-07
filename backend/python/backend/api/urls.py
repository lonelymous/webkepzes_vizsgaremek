from django.urls import path
from . import views

urlpatterns = [
    path('products', views.Products_Controller),
    path('products/<int:productId>', views.Product_Controller)
]