# <center> EventIt! Maintenance Guide</center>

## Table of Contents
1. [Introduction](#introduction)
2. [Server Side](#server-side)
	* [Quick start](#quick-start)
	 	* [Local](#local)
		* [Remote](#remote)
	* [Server Structure](#server-structure)	
	 	* [Main App](#main-app)
		* [Sub Apps](#sub-apps)
		* [Deploy](#deploy)
		* [Fixtures](#fixtures)
		* [Logging](#logging)
		* [My Models](#my-models)
	* [System Expansion](#system-expansion)
3. [Client Side](#client-side)
4. [Adding Functionality Schema](#adding-functionality-schema)
5. [Assimilation on New Device and Run All Program](#assimilation-on-new-device-and-run-all-program)

## Introduction
## Server Side
The Srever is writen in Python useing Django web framework
The main responsibilities of the server is to manage all the data of the users and make it accessible to the Client side.

### Quick Start
#### Local
* For start, you need to have on your device installed - git, python, pip.
* clone the git project to your local device - git clone https://github.com/amitrub/Final-Project.git.
* cd to $MAIN_DIR/Server.
* install all the python requirements - pip install -r requirements.txt.
* create the modules files for the server - python manage.py makemigrations.
* create the DB for all the modules objects - python manage.py migrate.
* now you can run the server - python manage.py runserver (0.0.0.0:8000 optional).
* open browser on - localhost:8000/api, and you can see the server running.

#### Remote 
* For start, you need to have a remote Linux server running, with HTTP port rule (80) and SSH port rule (22) open.
* connect to your remote server through SSH.
* update and upgrade your server - sudo apt update && sudo apt upgrade.
* install curl - sudo apt install curl.
* download the setup file and setup your server - curl -sL https://raw.githubusercontent.com/amitrub/Final-Project/main/Server/deploy/setup.sh | sudo bash -.
* open browser on - $SERVER_IP/api, and you can see the server running.

### Server Structure
#### Main App
The main app of the server is the server_django directory.
There are 3 parts in this app:
##### settings.py
This file is responsible for managing all server settings:
- ALLOWED_HOSTS
- INSTALLED_APPS
- WSGI_APPLICATION
- DATABASES
- LOGGING
- AUTH_PASSWORD_VALIDATORS
##### urls.py
This file is responsible for redirecte the base url to url file of each sub apps.
##### wsgi.py
This file is responsible for defining the Web Server Gateway Interface for the server.
#### Sub Apps
#### Deploy
#### Fixtures
#### Logging
#### My Models
### System Expansion
