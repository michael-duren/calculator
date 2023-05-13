import express from 'express';

let equation = [];
let result: number;

const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('server/public/'));

app.post('/calc', (req, res) => {
  equation = req.body;
  let parsedEquation = '';
  for (let item of equation) {
    if (isNaN(Number(item)) && item !== '.') {
      parsedEquation += ` ${item} `;
    } else {
      parsedEquation += item;
    }
  }

  result = eval(parsedEquation);

  res.sendStatus(201);
  console.log(parsedEquation);
  console.log(result);
});

app.get('/calc', (req, res) => {
  res.send(JSON.stringify(result));
});

app.post('/clear', (req, res) => {
  res.sendStatus(201);
  equation = [];
  result = 0;
});
