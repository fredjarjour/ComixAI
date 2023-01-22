FROM python:3.10-slim-bullseye

RUN rm -rf /usr/local/cuda/lib64/stubs

# Install libraries
COPY ./requirements.txt ./
RUN pip install -r requirements.txt

# Setup container directories
# RUN mkdir /app

ENV USE_TORCH=1

# Copy local code to the container
COPY ./app /app

# launch server with gunicorn
WORKDIR /app
EXPOSE 8080
CMD ["gunicorn", "main:app", "--timeout=0", "--preload", \
     "--workers=1", "--threads=4", "--bind=0.0.0.0:8080"]