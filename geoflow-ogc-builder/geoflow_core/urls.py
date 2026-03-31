from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Route all /api/ traffic to the urls.py file inside your 'api' app
    path('api/', include('api.urls')),
    
    # Optional: Automatically redirect the root URL (http://localhost:8000/) 
    # to your frontend builder interface
    path('', RedirectView.as_view(url='/static/index.html', permanent=False)),
]