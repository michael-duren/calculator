import express, { Request, Response } from 'express';

interface HistoryItem {}

let equationArray = [];
const history: HistoryItem[] = [];
let result: number;

const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('server/public/'));

app.post('/calc', (req: Request, res: Response) => {
  const calculation = req.body.join(' ');
  result = eval(calculation);
  console.log(calculation);
  equationArray = [];
  history.push({ calculation, result });

  res.sendStatus(201);
  console.log(history);
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
