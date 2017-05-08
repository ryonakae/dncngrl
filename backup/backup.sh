#!/bin/sh

# backup wp-data
docker run --rm --volumes-from brdr-data --volume $(pwd)/backup/data:/backup busybox tar cvf /backup/wp-data.tar /var/www/html

# backup db-data
docker run --rm --volumes-from brdr-data --volume $(pwd)/backup/data:/backup busybox tar cvf /backup/db-data.tar /var/lib/mysql

# backup db by mysqldump
# docker exec -i brdr-mysql mysqldump -h $1 -u root -p $2 > backup/data/db.sql