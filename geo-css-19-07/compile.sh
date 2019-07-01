#!/bin/bash

sass sass:css --watch --style compressed &
./mergeMQ.sh css/index

