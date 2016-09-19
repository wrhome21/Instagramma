var express = require('express');
var bodyParser = require('body-parser')

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var app = express();
var bodyParser = require('body-parser')
var db = require('./db.js'); 




app.use(bodyParser.json())


var compiler = webpack(webpackConfig);
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: { 
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(express.static(__dirname + '/www'));

app.post('/user', function (req, res) {
	//db.initDB(db); this happens when requiring
    //res.setHeader('Content-Type', 'text/plain')
  console.log("app.Post");
  console.log(req.body);
  console.log("req.body.username " + req.body.userName );
  var userName = req.body.userName;
 var p = db.insertUserProfile("", userName, "", ""); 
     p.then((val) => { 
         console.log("PK: " + val); 
         aUser.primaryKey=val; 
         printUser(aUser); 
     }).catch((err) => {console.log(err);}); 

  //res.send('how do i get the req value from this ajax post????');
  res.end(JSON.stringify(req.body))

});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
