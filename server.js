import Customer from './src/controllers/Customer';
import express from 'express';

const app = express();

app.use(express.json());
app.post('/api/v1/customers/import', Customer.import);

app.listen(3000);