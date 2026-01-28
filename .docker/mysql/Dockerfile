FROM mysql:9.5.0

ENV MYSQL_ALLOW_EMPTY_PASSWORD=true

COPY bengkel_motor.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
