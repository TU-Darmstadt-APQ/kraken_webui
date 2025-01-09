FROM mongo:7


COPY data/ /dump
COPY mongo_import.sh /docker-entrypoint-initdb.d/
