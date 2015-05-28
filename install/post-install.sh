#!/bin/bash

ADAPTERS='api/adapters/sails-rest'

# Install bower dependencies
bower install --allow-root

# Install the adapter
if [ "$(ls -A $ADAPTERS)" ]; then

    echo "Info: sails-rest already installed."

else
    PREV_PWD=$(pwd)

    mkdir -p $ADAPTERS

    cd $ADAPTERS

    git clone git@github.com:NiceToMiitYou/Sails-Rest.git .

    npm install

    cd "$PREV_PWD"
fi

# Into a container
if [ -f /.dockerinit ]; then

    echo "Info: I'm inside matrix, so I will try to reset the world!";

    mysql -u root < install/database.sql
    mysql -u root < install/database_triggers.sql
else

    echo "Info: Outside of the container, the database must be installed manually."
fi