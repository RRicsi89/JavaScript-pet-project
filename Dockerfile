FROM python:3.10-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache -r requirements.txt

COPY static ./static/
COPY templates ./templates/
COPY main.py wsgi.py ./

CMD gunicorn --bind 0.0.0.0:5000 wsgi:app
