import express, { Request, Response } from 'express';

let equationArray = [];
let result: number;

const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('server/public/'));

app.post('/calc', (req: Request, res: Response) => {
  equationArray = req.body;
  result = eval(equationArray.join(' '));
  console.log(equationArray.join(' '));
  equationArray = [];

  res.sendStatus(201);
  console.log(result);
});

app.get('/calc', (req: Request, res: Response) => {
  res.send(JSON.stringify(result));
});

// not necesassry since result is already re assigned on next calculation
app.post('/clear', (req, res) => {
  res.sendStatus(201);
  equationArray = [];
  result = 0;
});
