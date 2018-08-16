const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const URL_CONNECT = "mongodb://localhost:27017";
const dbName = "mydb"
const port = 5000;

mongoClient.connect(URL_CONNECT,{ useNewUrlParser: true } , (error, client) => {
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())
  const db = client.db(dbName);
  
  app.get('/lastdata', (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      db.collection("data").find().sort({_id:-1}).limit(1)
        .toArray((error, result) => {
          if(error) res.send({error: true, message: 'get fail!'});
          else
            res.send(result);
      });
  });

  app.get('/tracking', (req, res) => {

      res.sendfile(__dirname + '/tracking.html');
  });

  app.listen(port, () => {
      console.log(`server: ${port}`);
  });
});
