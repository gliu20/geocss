#!/bin/bash

### check if param exists; if not show help
if [ -z "$1" ]; then
  echo "Usage: $0 [file w/o extension]"
  echo ""
  echo "A simple command line interface for merging media queries."
  echo ""
  echo "By default, this application runs in watch mode"
  echo ""
  echo "NOTE: It is recommended that you create dummy media queries at the"
  echo "top of your file so the compiler knows which order you want them in"
  exit
fi


### Set initial time of file
LTIME=`stat -c %Z $1.css`

echo "Watching for changes..."

while true    
do
   ATIME=`stat -c %Z $1.css`

   if [[ "$ATIME" != "$LTIME" ]]
   then
       echo "Compiling $1.css to $1.min.css"
       node compileCSS.js $1.css > $1.min.css
       csso $1.min.css --output $1.min.css
       LTIME=$ATIME
   fi
   sleep 5
done


