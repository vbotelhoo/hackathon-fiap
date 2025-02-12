import express from 'express'
import bodyParser from 'body-parser';
import newsController from './crontollers/newsController'


const app = express();
const port = 3001;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/news', newsController);

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
