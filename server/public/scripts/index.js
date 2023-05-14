console.log("Hey there buddy I'm not your pal, guy");

// global
const entryId = document.querySelector('#entry');

// current calculation
let calculation = [];

const historyId = document.querySelector('#history-items');

// get history after a refresh
fetch('/calc')
  .then((response) => response.json())
  .then((responseObj) => {
    historyId.innerHTML = renderHistory(responseObj.history);
  });

function addToOperation(event) {
  // get num to add
  const number = event.target.outerText;

  // check for classes
  if (entryId.classList.contains('entry-empty')) {
    entryId.innerHTML = '';
    entryId.classList.remove('entry-empty');
  }

  if (entryId.classList.contains('equated')) {
    entryId.innerHTML = '';
    entryId.classList.remove('equated');
  }

  if (isNaN(entryId.innerText)) {
    entryId.innerText = '';
  }
  // check for operators
  if (isNaN(number) && number !== '.') {
    // check that the last entered item was not an operator
    if (isNaN(calculation[calculation.length - 1])) {
      return;
    }
    entryId.innerHTML = '';
    entryId.innerHTML = number;
    calculation.push(number);
  }

  // add number
  else {
    entryId.innerHTML += number;
    if (isNaN(calculation[calculation.length - 1])) {
      calculation.push(number);
    } else {
      calculation[calculation.length - 1] += number;
    }
  }
}

function invertPolarity() {
  // get value of entry
  if (calculation.length <= 0) {
    return;
  }
  calculation[calculation.length - 1] = togglePolarity(
    calculation[calculation.length - 1]
  );
  const tmp = entryId.innerHTML;
  entryId.innerHTML = togglePolarity(tmp);
}

function togglePolarity(numString) {
  if (numString.includes('-')) {
    return numString.replace('-', '');
  } else {
    return `-${numString}`;
  }
}

function clearOperation() {
  entryId.innerHTML = '0';
  entryId.classList.add('entry-empty');
  calculation = [];
}

function submitOperation() {
  fetch('/calc', {
    method: 'POST',
    body: JSON.stringify({ calculation }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    fetch('/calc')
      .then((response) => response.json())
      .then((responseObj) => {
        console.log(responseObj);
        entryId.innerText = responseObj.result;
        entryId.classList.add('equated');
        calculation = [];
        historyId.innerHTML = renderHistory(responseObj.history);
      });
  });
}

function renderHistory(historyArr) {
  return historyArr.reduce((a, b) => {
    return a + `<div>${b.calculation} = ${b.result}</div>`;
  }, '');
}

function clearHistory() {
  fetch('/clear', {
    method: 'DELETE',
  }).then(() => {
    historyId.innerHTML = '';
  });
}
