console.log("Hey there buddy I'm not your pal, guy");

// global
const entryId = document.querySelector('#entry');

let calculation = [];

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

  console.log(calculation);
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
  fetch('/clear', {
    method: 'POST',
  }).then(() => {
    entryId.innerHTML = '0';
    entryId.classList.add('entry-empty');
    calculation = [];
  });
}

function submitOperation() {
  fetch('/calc', {
    method: 'POST',
    body: JSON.stringify(calculation),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    fetch('/calc')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        entryId.innerText = result;
        entryId.classList.add('equated');
        calculation = [];
      });
  });
}
