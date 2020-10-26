import express, {Response, Request, response} from 'express';
import { postgres } from './database/postgres';
import Config from './config';
import * as database from './database';
import apiRouter from './routes/api'
import bodyParser from 'body-parser';
import pageRouter from './routes/pages'

const app = express();

let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(urlencodedParser);
app.use('/api', apiRouter);
app.use('/', pageRouter);

database.init(postgres)
.then(() => {
    app.listen(Config.PORT, () => {
        console.log(`Example app listening at ${Config.URL}:${Config.PORT}`);
    });
})
.catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', err);
});