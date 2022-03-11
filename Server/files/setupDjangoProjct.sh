#!/bin/bash

#link to toturial
#https://www.youtube.com/watch?v=Uyei2iDA4Hs&list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60
#https://www.youtube.com/watch?v=UmljXZIypDc&list=PL-osiE80TeTtoQCKZ03TU5fNfx2UY6U4p&index=1
#react
#https://www.youtube.com/watch?v=93p3LxR9xfM
#https://www.youtube.com/watch?v=AfWYO8t7ed4&list=PLoYCgNOIyGACDQLaThEEKBAlgs4OIUGif
#https://www.youtube.com/watch?v=MhkGQAoc7bc&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b
#https://www.youtube.com/watch?v=9kJVYpOqcVU

#install pip3
sudo apt install python3-pip

#install virtual envirmant
pip3 install pipenv

#create pipenv shell file login to the envirmante
pipenv shell

#install things to the framwork
pipenv install django djangorestframework django-rest-knox

#installing django
pip3 install django
pip3 install Django==2.1

#chack version
python3 -m django --version

#see all the django commends
django-admin

#create new project
django-admin startproject <project_name>

#run the server
python3 manage.py runserver (0.0.0.0:8000 optional)

#create new app
python3 manage.py startapp <app_name>

#create model from exciting table
python3 manage.py inspectdb <table_name>

#create models in app
python3 manage.py makemigrations <app_name>

#foreignkey
customerid = models.ForeignKey(
        'customers.TbdatCustomers', db_column='CustomerID', on_delete=models.CASCADE)

#add to database
python3 manage.py migrate

#create superuser
python3 manage.py createsuperuser

#To dump data:
python3 manage.py dumpdata app.model_name --indent 4 > fixtures/model_name.json

#To load data:
python3 manage.py loaddata fixtures/model_name.json --app app.model_name

#frontend app!!
#create package.json file - init npm
npm init -y

#install webpack
#create webpack.config.js file
npm i -D webpack webpack-cli

#install babel
#create .babelrc file
npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties
#install react
npm i react react-dom prop-types

#enter to packge.json in scripts:{}
#with the path to the files
"dev": "webpack --mode development --watch ./frontend/src/index.js --output ./frontend/static/frontend/main.js",
"build": "webpack --mode production ./frontend/src/index.js --output ./frontend/static/frontend/main.js"

#index.html
#css file the GUI format right click on downlowd
https://bootswatch.com/

#the javascript
https://getbootstrap.com/

#build the main.js in the frontend
npm run dev
npm run build

#libary in code of key bourd surtcats- ES7 React/Redux/GraphQL/React-Native snippets
#libary in code for react view- Prettier - Code formatter    enable format on save

#redux
#google-chrome install Redux DevTools

#npm install redux
npm i redux react-redux redux-thunk redux-devtools-extension


