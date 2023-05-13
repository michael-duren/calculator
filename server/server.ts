import express from 'express';

let equationArray = [];
let result: number;

const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('server/public/'));

app.post('/calc', (req, res) => {
  equationArray = req.body;
  let parsedEquation = '';
  for (let item of equationArray) {
    if (isNaN(Number(item)) && item !== '.') {
      parsedEquation += ` ${item} `;
    } else {
      parsedEquation += item;
    }
  }
  console.log(equationArray);

  result = eval(parsedEquation);
  equationArray = [];

  res.sendStatus(201);
  console.log(parsedEquation);
  console.log(result);
});

app.get('/calc', (req, res) => {
  res.send(JSON.stringify(result));
});

// not necesassry since result is already re assigned on next calculation
app.post('/clear', (req, res) => {
  res.sendStatus(201);
  equationArray = [];
  result = 0;
});
