#!/bin/bash
#

# check if manage.py exists
if [ -f manage.py ]; then
  python manage.py runserver
else
  echo "manage.py not found, skipping..."
fi

