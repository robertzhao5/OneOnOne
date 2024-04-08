#!/bin/bash

# create venv in venv folder
python3 -m venv venv
source venv/bin/activate

echo "venv is active..."

echo "installing Django"
pip install Django==4.2

echo "installing required packages..."
pip install Pillow
pip install djangorestframework django-cors-headers
pip install djangorestframework-simplejwt


echo "=============================================="
echo "running db migrations..."
$manage_path="backend/OneonOne/manage.py"


if [ -f "$manage_path" ]; then
    # If manage.py exists, run makemigrations and migrate
    python $manage_path makemigrations
    python $manage_path migrate
else
    echo "manage.py not found at $manage_path, skipping migrations..."
fi
echo "=============================================="
