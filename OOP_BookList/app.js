// Book Constructor

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI constructor
class UI {
  addToTable(book) {
    const table = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class='delete'>X</a>`;

    table.appendChild(row);
  }

  showAlert(message, className) {
    // Create a Div
    const div = document.createElement("div");

    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.querySelector("#isbn").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }
}
// Local storage class

class Store {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      // add book to UI

      ui.addToTable(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn == isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event Listener when DOM content is Loaded
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listeners and Inputs From Form

document.querySelector("#book-form").addEventListener("submit", function (e) {
  const title = document.querySelector("#title").value;
  const auth = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, auth, isbn);

  const ui = new UI();

  if (title === "" || auth === "" || isbn === "") {
    ui.showAlert("Dont leave them empty", "error");
    ui.clearFields();
  } else {
    ui.addToTable(book);

    // Add to LS
    Store.addBook(book);
    ui.showAlert("Book successfully added !", "success");

    ui.clearFields();
  }

  console.log("test");
  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", deleteItem);

function deleteItem(e) {
  const ui = new UI();
  if (e.target.className === "delete") {
    console.log(e.target.parentElement.previousElementSibling);
    e.target.parentElement.parentElement.remove();
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert("Book successfully removed !", "success");
  }

  e.preventDefault();
}
