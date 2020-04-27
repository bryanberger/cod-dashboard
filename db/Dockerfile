FROM mysql:5.7

ADD my.cnf /etc/mysql/conf.d/my.cnf

RUN chown -R mysql:root /var/lib/mysql/

# Arguments
ARG MYSQL_DATABASE=default_database
ARG MYSQL_USER=default_user
ARG MYSQL_PASSWORD=secret
ARG MYSQL_ROOT_PASSWORD=root
ARG TZ=America/New_York

# Convert them to ENV Vars
ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
ENV TZ=$TZ

CMD ["mysqld"]
EXPOSE 3306

# ADD setup.sql /docker-entrypoint-initdb.d