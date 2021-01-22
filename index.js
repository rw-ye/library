"use strict";
let myLibrary = [];
const row = document.createElement('div');
const container = document.querySelector('.container');
container.appendChild(row);

if (getStorage()) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
}

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
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

Book.prototype.status = function () {
  return (this.read == 'Read' ? this.read = 'Not Read' : this.read = 'Read');
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
  saveLibrary()
})

function addBookToLibrary(book) {
  myLibrary.push(book);
  showBooks()
}


function showBooks() {
  const items = document.querySelectorAll('.col.l3');

  if (items.length > 0) {
    items.forEach(item => item.remove());
  }

  let index = 0
  myLibrary.forEach(book => {

    const col = document.createElement('div');
    const card = document.createElement('div');
    const card_title = document.createElement('div');
    const card_content = document.createElement('div');
    const span = document.createElement('span');
    const p = document.createElement('p');
    const p_two = document.createElement('p');
    const book_status = document.createElement('a');
    const a = document.createElement('a');
    const i = document.createElement('i');

    span.textContent = book.title;
    p.textContent = book.author;
    p_two.textContent = book.pages;
    book_status.textContent = book.read;
    i.textContent = "delete";

    row.classList.add('row');
    col.classList.add('col', 'l3', 's12');
    card.classList.add('card');
    card_title.classList.add('card-content', 'white');
    card_content.classList.add('card-content');
    span.classList.add('black-text', 'card-title');
    p.classList.add('black-text');
    p_two.classList.add('black-text');
    book_status.classList.add('waves-effect', 'waves-light', 'btn', 'status');
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
    card_content.appendChild(book_status);

    a.appendChild(i);
    col.dataset.index = index;

    document.querySelectorAll('.remove')[index].addEventListener('click', () => {
      removeBook(col.dataset.index);
      updateBookIndex();
    });

    document.querySelectorAll('.status')[index].addEventListener('click', () => {
      updateBookIndex();
      book.status();
      book_status.textContent = book.read;
      saveLibrary()
    });
    index++;
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
  myLibrary.splice(index, 1);
  document.querySelector(`[data-index='${index}']`).remove();
  console.log(myLibrary);
  saveLibrary();
}

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getStorage() {
  let data = JSON.parse(localStorage.getItem('myLibrary'));
  return data;
}

showBooks();

