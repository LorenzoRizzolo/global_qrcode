#!/bin/bash

export DBHOST="localhost"
export DBNAME="qrcode"
export DBPASSWORD="Rizzolo.34"
export DBUSER="lorenzo"
export BODY_SIZE_LIMIT=Infinity

npm run dev -- --port 4305
