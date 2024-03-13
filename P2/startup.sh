#!/bin/bash

# create venv in venv folder
python3 -m venv venv
source venv/bin/activate

echo "venv is active..."

echo "installing Django"
pip install Django==4.2

echo "installing required packages..."
pip install Pillow
pip install djangorestframework
pip install djangorestframework-simplejwt


echo "=============================================="
echo "running db migrations..."
if [ -f manage.py ]; then
    # If manage.py exists, run makemigrations and migrate
    python manage.py makemigrations
    python manage.py migrate
else
    echo "manage.py not found, skipping migrations..."
fi
echo "=============================================="
