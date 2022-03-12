cd ..

rd -r "*/migrations/*.py"
rd -r "*/migrations/*.pyc"

rd db.sqlite3

python manage.py makemigrations
python manage.py migrate

python manage.py loaddata fixtures/users.json
python manage.py loaddata fixtures/events.json
python manage.py loaddata fixtures/addresses.json