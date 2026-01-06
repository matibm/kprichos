#!/bin/bash

# Script de despliegue para K'Prichos
# Servidor: root@147.182.244.85
# Dominio: kprichos.dh.com.py

echo "🚀 Iniciando despliegue de K'Prichos..."

# Construir el proyecto
echo "📦 Construyendo proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build. Abortando despliegue."
    exit 1
fi

# Desplegar al servidor
echo "📤 Subiendo archivos al servidor..."
rsync -avz --delete dist/ root@147.182.244.85:/var/www/kprichos.dh.com.py/

if [ $? -eq 0 ]; then
    echo "✅ Despliegue completado exitosamente!"
    echo "🌐 Sitio disponible en: https://kprichos.dh.com.py"
else
    echo "❌ Error al subir archivos al servidor."
    exit 1
fi

