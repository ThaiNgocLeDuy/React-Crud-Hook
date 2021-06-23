import React, { useState } from "react";
import Fuse from "fuse.js";
import BookTable from "../tables/BookTable";
import AddBookForm from "../forms/AddBookForm";
import EditBookForm from "../forms/EditBookForm";
import bookList from "../data/data";
import "./HomePage.css";

function HomePage(props) {
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

  const [doForm, setDoForm] = useState(false);

  const handleOpenForm = () => {
    setDoForm(!doForm);
    setIsEdit(false);
    setCurrentBook(initBook);
    console.log(doForm);
  };

  const handleForm = doForm ? (
    <>
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
    </>
  ) : (
    ""
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={doForm ? "col-lg-4 col-md-4 col-sm-4 col-xs-4" : ""}>
          {handleForm}
        </div>
        <div
          className={
            doForm
              ? "col-lg-8 col-md-8 col-sm-8 col-xs-8"
              : "col-lg-12 col-md-12 col-sm-12 col-xs-12"
          }
        >
          <div className="header">
            {doForm ? (
              <button
                className="btn btn-danger text-uppercase"
                onClick={handleOpenForm}
              >
                CLOSE
              </button>
            ) : (
              <button
                className="btn btn-primary text-uppercase"
                onClick={handleOpenForm}
              >
                ADD
              </button>
            )}
            <h2 className="text-uppercase d-inline-block text-center w-75 title">
              Book List
            </h2>
            <input
              className="input_search rounded text-center float-right"
              type="text"
              placeholder="Enter to Search"
              onChange={(e) => searchData(e.target.value)}
            />
          </div>

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

export default HomePage;
