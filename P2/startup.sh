#!/bin/bash

# create venv in venv folder
python3 -m venv venv
source venv/bin/activate
pip install Django==4.2


echo "=============================================="
if [ -f manage.py ]; then
    # If manage.py exists, run makemigrations and migrate
    python manage.py makemigrations
    python manage.py migrate
else
    echo "manage.py not found, skipping migrations."
fi
echo "=============================================="

pip install Pillow
deactivate
