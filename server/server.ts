import express, { Request, Response } from 'express';

interface HistoryItem {
  calculation: string;
  result: number;
}

let equationArray = [];
let history: HistoryItem[] = [];
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
  res.send(JSON.stringify({ result, history }));
});

app.delete('/clear', (req: Request, res: Response) => {
  history = [];
  res.sendStatus(201);
});
