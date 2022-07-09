#!/usr/bin/env bash

set -e

PROJECT_BASE_PATH='/usr/local/apps/Final-Project'
SERVER_BASE_PATH='/usr/local/apps/Final-Project/Server'

rm $SERVER_BASE_PATH/db.sqlite3
$SERVER_BASE_PATH/env/bin/python3 manage.py migrate
$SERVER_BASE_PATH/env/bin/python3 manage.py loaddata fixtures/*.json
$SERVER_BASE_PATH/env/bin/python3 manage.py collectstatic --noinput
supervisorctl restart server_django

echo "DONE! :)"
