import { useState } from "react";
import AddBookForm from "./components/forms/AddBookForm";
import EditBookForm from "./components/forms/EditBookForm";
import BookTable from "./components/tables/BookTable";
import bookList from "./components/data/data";
import Fuse from "fuse.js";

function App() {
  //data
  const data = JSON.parse(localStorage.getItem("listbooks")) || bookList;

  const [books, setBooks] = useState(data);

  //func add
  const addBook = (book) => {
    console.log(book);
    book.id = books.length + 1;
    const newBook = [...books, book];
    setBooks(newBook);
    //set localstorage
    localStorage.setItem("listbooks", JSON.stringify(newBook));
  };

  //func delete
  const deleteBook = (id) => {
    console.log(id);
    const index = books.findIndex((x) => x.id === id);
    if (index < 0) return;
    const newBook = [...books];
    console.log(newBook);
    newBook.splice(index, 1);
    setBooks(newBook);
    //set localstorage
    localStorage.setItem("listbooks", JSON.stringify(newBook));
  };

  //isEdit to check whether click button edit
  const [isEdit, setIsEdit] = useState(false);
  // initBook to set form
  const initBook = { id: null, name: "", author: "" };
  //currentBook: book chosen
  const [currentBook, setCurrentBook] = useState(initBook);

  //func editBook change to editForm
  const editBook = (id, book) => {
    setIsEdit(true);
    setCurrentBook(book);
  };

  //func update book
  const updateBook = (updateBook) => {
    setBooks(
      books.map((book) => (book.id === currentBook.id ? updateBook : book))
    );
    //find position of the book updated
    const index = books.findIndex((x) => x.id === updateBook.id);
    console.log(index);
    books[index] = updateBook;
    console.log(books);

    setCurrentBook(initBook);
    setIsEdit(false);
    //set localstorage
    localStorage.setItem("listbooks", JSON.stringify(books));
  };

  //func search using fuse.js
  //thanks to bit.dev
  //you can learn about fuse in this link below
  //https://blog.bitsrc.io/add-a-simple-search-function-to-react-app-without-a-server-22deda8966cd
  const searchData = (keyword) => {
    if (!keyword) {
      setBooks(data);
      return;
    }

    const fuse = new Fuse(data, {
      keys: ["name", "author"],
    });

    const result = fuse.search(keyword);
    const matches = [];
    if (!result.length) {
      setBooks([]);
    } else {
      result.forEach(({ item }) => {
        matches.push(item);
      });
      setBooks(matches);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">React Crud App</h1>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
          {isEdit ? (
            <>
              <h2 className="text-uppercase">Edit Book</h2>
              <EditBookForm
                currentBook={currentBook}
                setIsEdit={setIsEdit}
                updateBook={updateBook}
              />
            </>
          ) : (
            <>
              <h2 className="text-uppercase">Add Book</h2>
              <AddBookForm addBook={addBook} />
            </>
          )}
        </div>
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
          <h2 className="text-uppercase d-inline">List Books</h2>
          <input
            className="rounded text-center float-right"
            type="text"
            placeholder="Enter to Search"
            onChange={(e) => searchData(e.target.value)}
          />
          <BookTable
            books={books}
            deleteBook={deleteBook}
            editBook={editBook}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
