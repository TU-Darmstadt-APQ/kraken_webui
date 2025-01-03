#!/bin/sh

mongoimport --db sensor_config --collection TinkerforgeSensor --file /dump/TinkerforgeSensor.json
