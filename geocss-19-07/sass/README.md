# Why geocss?
It's lightweight. It's modular. It has minimal js.

# Getting Started
Link the index.min.css from the css folder in this repo to your site.
For info on how to use, see the examples in the components sticker sheet (see index.html).

## No source map?
This can be resolved if someone is willing to make a media query merger with support for source maps.

# Custom builds
To strip away things you don't need, look inside constants and the index.scss and comment out the imported components and utilities you don't want. Then run `./compile.sh`. The final css is in `index.min.css`. 

# Why did you make geocss?
geocss is a lightweight css framework written from scratch as a project to fully understand sass (the scss version) and css.