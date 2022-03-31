#!/usr/bin/env bash

set -e

PROJECT_GIT_URL='https://github.com/amitrub/Final-Project.git'

PROJECT_BASE_PATH='/usr/local/apps/Final-Project'
SERVER_BASE_PATH='/usr/local/apps/Final-Project/Server'

echo "Installing dependencies..."
apt-get update
apt-get install -y python3-dev python3-venv sqlite python-pip3 supervisor nginx git

# Create project directory
mkdir -p $PROJECT_BASE_PATH
git clone $PROJECT_GIT_URL $PROJECT_BASE_PATH

# Create virtual environment
mkdir -p $SERVER_BASE_PATH/env
python3 -m venv $SERVER_BASE_PATH/env

# Install python packages
$SERVER_BASE_PATH/env/bin/pip3 install -r $SERVER_BASE_PATH/requirements.txt
$SERVER_BASE_PATH/env/bin/pip3 install uwsgi==2.0.18

# Run migrations and collectstatic
cd $SERVER_BASE_PATH
$SERVER_BASE_PATH/env/bin/python3 manage.py migrate
$SERVER_BASE_PATH/env/bin/python3 manage.py collectstatic --noinput

# Configure supervisor
cp $SERVER_BASE_PATH/deploy/supervisor_server_django.conf /etc/supervisor/conf.d/server_django.conf
supervisorctl reread
supervisorctl update
supervisorctl restart server_django

# Configure nginx
cp $SERVER_BASE_PATH/deploy/nginx_server_django.conf /etc/nginx/sites-available/server_django.conf
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/server_django.conf /etc/nginx/sites-enabled/server_django.conf
systemctl restart nginx.service

echo "DONE! :)"
