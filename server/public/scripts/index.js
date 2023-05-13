console.log("Hey there buddy I'm not your pal, guy");

// global
const entryId = document.querySelector('#entry');

let calculation = [];

function addToOperation(event) {
  const number = event.target.outerText;
  if (entryId.classList.contains('entry-empty')) {
    entryId.innerHTML = '';
    entryId.classList.remove('entry-empty');
  }

  if (
    (isNaN(Number(number)) || isNaN(Number(entryId.innerText))) &&
    number !== '.'
  ) {
    entryId.innerHTML = '';
  }

  entryId.innerHTML += number;
  calculation.push(number);
}

function clearOperation() {
  entryId.innerHTML = '0';
  calculation = [];
  entryId.classList.add('entry-empty');
}

function submitOperation() {
  fetch('/calc', {
    method: 'POST',
    body: JSON.stringify(calculation),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
