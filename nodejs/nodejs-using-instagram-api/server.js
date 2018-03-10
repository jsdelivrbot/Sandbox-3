// grab the packages we need
const express = require('express');
const app = express();
const ig = require('instagram-node').instagram();

// configure the app
// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));

// set the view engine
app.set('view engine', 'pug');

// configure instagram app with your access token
ig.use({
  // get access token here: http://instagram.pixelunion.net/
  access_token: '4311445068.1677ed0.9df4299bacb14ad49285a58847b6c2c6'
});

// set the routes
// GET '/'
app.get('/', (req, res) => {
  // use the instagram package to get our profile's media
  ig.user_self_media_recent((err, medias, pagination, remaining, limit) => {
    // render the home page and pass in our profile's images
    res.render('pages/index', { grams: medias });
  });
});

// start the server
app.listen(8080);
console.log('App started! Look at http://localhost:8080');