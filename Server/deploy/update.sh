#!/usr/bin/env bash

set -e

PROJECT_BASE_PATH='/usr/local/apps/Final-Project'
SERVER_BASE_PATH='/usr/local/apps/Final-Project/Server'

git pull
$SERVER_BASE_PATH/env/bin/python manage.py migrate
$SERVER_BASE_PATH/env/bin/python manage.py collectstatic --noinput
supervisorctl restart server_django

echo "DONE! :)"
