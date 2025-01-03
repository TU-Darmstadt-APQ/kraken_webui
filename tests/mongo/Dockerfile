FROM mongo:7


COPY data/ /dump
COPY mongo_restore.sh /docker-entrypoint-initdb.d/
