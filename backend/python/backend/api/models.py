from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name