#!/bin/sh

# restore wp-data
docker run --rm -it --volumes-from brdr-data --volume $(pwd)/backup/data:/backup busybox tar xvf /backup/wp-data.tar

# restore db-data
docker run --rm -it --volumes-from brdr-data --volume $(pwd)/backup/data:/backup busybox tar xvf /backup/db-data.tar

# restart
docker-compose restart

# delete backup files
# rm -rf $(pwd)/backup/data/db.sql
# rm -rf $(pwd)/backup/data/wp-data.tar