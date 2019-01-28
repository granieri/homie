# Homie
Homie is a game we developed for [Global Game Jam 2019](https://globalgamejam.org/). The theme was "what does home mean to you?" so we decided to think about what home *will* mean in the future—a smart home! In Homie, you play as a smart home speaker, and try to make your human happy. At the end of the day (which lasts about 45 seconds), you get an inside look at what your human thought of his new tech. 

You can play it at http://anterrobang.org/homie (shout out to ant for hosting)

## build
Homie is an HTML5 game built with the Phaser framework. Phaser is loaded via CDN, so all you need to run it locally is a web server. You can use whatever tool you want to do that, but we used Node. 

To develop with Node:
```bash
#using browser-sync:
npm install -g browser-sync
browser-sync start --server --files "code/*,assets/*,index.html"

#using express
npm install
node app.js
```

## credits
* code by max & erik
* art by mark, yo, & wilfred
* foley by rob
