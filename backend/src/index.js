import express from 'express';
import bodyParser from 'body-parser';
import newsController from './contollers/newsController';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/news', newsController);

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
