import express from 'express';

import routes from './routes';

// Inicia o banco de dados
import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log('Backend Started!! 🚀'));
