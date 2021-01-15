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
  const index = myLibrary.indexOf(book);
  showBook(book, index);
}

function showBook(book, index) {
  const col = document.createElement('div');
  const card = document.createElement('div');
  const card_title = document.createElement('div');
  const card_content = document.createElement('div');
  const span = document.createElement('span');
  const p = document.createElement('p');
  const p_two = document.createElement('p');
  const p_three = document.createElement('p');
  const a = document.createElement('a');
  const i = document.createElement('i');

  span.textContent = book.title;
  p.textContent = book.author;
  p_two.textContent = book.pages;
  p_three.textContent = book.read;
  i.textContent = "delete";

  row.classList.add('row');
  col.classList.add('col', 'l3', 's12');
  card.classList.add('card');
  card_title.classList.add('card-content', 'white');
  card_content.classList.add('card-content');
  span.classList.add('black-text', 'card-title');
  p.classList.add('black-text');
  p_two.classList.add('black-text');
  p_three.classList.add('black-text');
  a.classList.add('btn-floating', 'btn-medium', 'waves-effect', 'waves-light', 'red', 'remove');
  i.classList.add('material-icons');
  a.style.float = "right";

  row.appendChild(col);
  col.appendChild(card);
  card_title.appendChild(a);
  card.appendChild(card_title);
  card_title.appendChild(span);
  card.appendChild(card_content);
  card_content.appendChild(p);
  card_content.appendChild(p_two);
  card_content.appendChild(p_three);

  a.appendChild(i);

  col.dataset.index = index;

  document.querySelectorAll('.remove')[col.dataset.index].addEventListener('click', () => {
    removeBook(col.dataset.index);
    updateBookIndex();
  });
}


function updateBookIndex() {
  let x = 0;
  let thecol = document.querySelectorAll('.col.l3');
  thecol.forEach(c => {
    c.dataset.index = x;
    x++;
  });
}


function removeBook(index) {
  console.log(index);
  let x = 0;
  let col = document.querySelectorAll('.col.l3');
  myLibrary.splice(index, 1);
  document.querySelector(`[data-index='${index}']`).remove();
  console.log(myLibrary);
}