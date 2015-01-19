#!/bin/bash

ADAPTERS='api/adapters/sails-rest'

# Install the adapter
if [ "$(ls -A $ADAPTERS)" ]; then

    echo "Info: sails-rest already installed."

else
    PREV_PWD=$(pwd)

    mkdir -p $ADAPTERS

    cd $ADAPTERS

    git clone ssh://git@stash.priv.itevents.fr:7999/utils/sails-rest.git .

    npm install

    cd "$PREV_PWD"
fi

# Inside a container
if [ -f /.dockerinit ]; then

    echo "Info: I'm inside matrix, so I will try to reset the world!";

    DATABASE="fr_miit_app"
    RESULT=$(mysqlshow --u root -p $DATABASE| grep -v Wildcard | grep -o $DATABASE)

    # Database installed:
    if [ "$RESULT" == "$DATABASE" ]; then
        
        echo "Info: database already installed."
    else

        mysql -u root < install/database.sql
    fi
else

    echo "Info: Outside of the container, the database must be installed manualy."
fi