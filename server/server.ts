import express from 'express';

let equation = [];

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

  res.sendStatus(201);
  console.log(parsedEquation);
});
