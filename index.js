let myLibrary = [];
const row = document.createElement('div');
const container = document.querySelector('.container');
container.appendChild(row);

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read == false ? 'not read yet' : 'read'}`;
}

document.querySelector("#new_movie").addEventListener("submit", function (e) {
  e.preventDefault();
  let myForm = e.target;
  let fd = new FormData(myForm);
  const title = fd.get('title');
  const author = fd.get('author');
  const pages = fd.get('pages');
  const read = fd.get('read');
  const book = new Book(title, author, pages, read);
  e.target.reset();
  addBookToLibrary(book);
})


function addBookToLibrary(book) {
  myLibrary.push(book);
  showBook(book);
}

function showBook(book) {
  const col = document.createElement('div');
  const card = document.createElement('div');
  const card_title = document.createElement('div');
  const card_content = document.createElement('div');
  const span = document.createElement('span');
  const p = document.createElement('p');
  const p_two = document.createElement('p');
  const p_three = document.createElement('p');

  span.textContent = book.title;
  p.textContent = book.author;
  p_two.textContent = book.pages;
  p_three.textContent = book.read;

  row.classList.add('row');
  col.classList.add('col', 'l3');
  card.classList.add('card');
  card_title.classList.add('card-content', 'white');
  card_content.classList.add('card-content');
  span.classList.add('black-text', 'card-title');
  p.classList.add('black-text');
  p_two.classList.add('black-text');
  p_three.classList.add('black-text');

  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(card_title);
  card_title.appendChild(span);
  card.appendChild(card_content);
  card_content.appendChild(p);
  card_content.appendChild(p_two);
  card_content.appendChild(p_three);
}