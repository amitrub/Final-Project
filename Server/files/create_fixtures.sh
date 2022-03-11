#!/bin/bash

cd ..

python3 manage.py dumpdata users --indent 4 > fixtures/users.json
python3 manage.py dumpdata addresses --indent 4 > fixtures/addresses.json
python3 manage.py dumpdata events --indent 4 > fixtures/events.json
#python3 manage.py dumpdata products --indent 4 > fixtures/products.json
#python3 manage.py dumpdata tasks --indent 4 > fixtures/tasks.json
#python3 manage.py dumpdata payments --indent 4 > fixtures/payments.json
