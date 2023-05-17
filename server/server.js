const express = require('express');

// types
// state

let history = [];
let result;

// server setup

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('server/public/'));

// api requests

app.post('/calc', (req, res) => {
  const calculation = req.body.calculation;

  // validateArray returns true if every item is either a number or operator
  if (validateArray(calculation) !== true) {
    res.sendStatus(409);
    return;
  }
  result = calculateResult(calculation);
  history.push({ calculation: calculation.join(' '), result });

  res.sendStatus(201);
});

app.get('/calc', (req, res) => {
  res.send(JSON.stringify({ result, history }));
});

app.delete('/clear', (req, res) => {
  history = [];
  res.sendStatus(201);
});

// functions
function getOperator(stringOp) {
  switch (stringOp) {
    case '+':
      return (a, b) => a + b;
    case '-':
      return (a, b) => a - b;
    case '*':
      return (a, b) => a * b;
    case '/':
      return (a, b) => a / b;
    default:
      return (a, b) => a % b;
  }
}

function calculateResult(calcArr) {
  const newCalc = [...calcArr];
  while (newCalc.includes('*') || newCalc.includes('/')) {
    const index = newCalc.findIndex((el) => el === '*' || el === '/');
    const operator = getOperator(newCalc[index]);
    const replacement = operator(+newCalc[index - 1], +newCalc[index + 1]);
    newCalc.splice(index - 1, 3, replacement.toString());
  }
  while (newCalc.includes('+') || newCalc.includes('-')) {
    const index = newCalc.findIndex((el) => el === '+' || el === '-');
    const operator = getOperator(newCalc[index]);
    const replacement = operator(+newCalc[index - 1], +newCalc[index + 1]);
    newCalc.splice(index - 1, 3, replacement.toString());
  }

  return +newCalc[0];
}

function validateArray(calcArr) {
  const regex = /\d+|[\/\+\-\*\%]/;
  const validator = (item) => regex.test(item);
  return calcArr.every((item) => validator(item));
}
