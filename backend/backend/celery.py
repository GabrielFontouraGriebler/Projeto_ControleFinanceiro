from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Configuração do Celery para usar as configurações do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Lê configurações do arquivo settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Descobre automaticamente as tarefas nos apps instalados
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')