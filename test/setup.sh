#! /bin/bash

mlaunch start all

mongoimport --uri="mongodb://localhost:27015" --db=tracker --collection=caffeine