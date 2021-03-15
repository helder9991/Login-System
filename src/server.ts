import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import handleErrors from './middlewares/handleErrors';

// Inicia o banco de dados
import './database';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// Lida com os erros da aplicacao
app.use(handleErrors);

app.listen(3000, () => console.log('Backend Started!! 🚀'));
