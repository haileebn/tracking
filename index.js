const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.get('/', (req, res) => {
      res.redirect('/tracking');
  });
  app.get('/tracking', (req, res) => {

      res.sendfile(__dirname + '/tracking.html');
  });

  app.listen(port, () => {
      console.log(`server: ${port}`);
  });
