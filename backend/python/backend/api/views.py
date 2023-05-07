from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Product

from .serializers import ProductSerializer

# Create your views here.
@api_view(['GET','POST'])
def Products_Controller(request):
    try:
        if request.method == 'GET':
            elements = Product.objects.all()
            serialized = ProductSerializer(elements, many=True)
            return Response(serialized.data)
        elif request.method == 'POST':
            data = request.data
            element = Product.objects.create(
                name = data['name'],
                description = data['description'],
                price = data['price'],
                quantity = data['quantity']
            )
            serialized = ProductSerializer(element, many=False)
            return Response(serialized.data)
    except Exception as e:
        return Response({'detail': str(e)}, status=400)

@api_view(['GET','PATCH','DELETE'])
def Product_Controller(request, productId):
    try:
        if request.method == 'GET':
            element = Product.objects.get(id=productId)
            serialized = ProductSerializer(element, many=False)
            return Response(serialized.data)
        elif request.method == 'PATCH':
            data = request.data
            element = Product.objects.get(id=productId)
            element.name = data['name']
            element.description = data['description']
            element.price = data['price']
            element.quantity = data['quantity']
            element.save()
            serialized = ProductSerializer(element, many=False)
            return Response(serialized.data)
        elif request.method == 'DELETE':
            element = Product.objects.get(id=productId)
            element.delete()
            return Response({'detail': 'Product deleted'})
    except:
        return Response({'detail': 'Product not found'}, status=404)