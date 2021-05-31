import { useState } from "react";
import AddBookForm from "./components/forms/AddBookForm";
import EditBookForm from "./components/forms/EditBookForm";
import BookTable from "./components/tables/BookTable";
import bookList from "./data";

function App() {
  const [books, setBooks] = useState(bookList);

  const addBook = (book) => {
    console.log(book);
    book.id = books.length + 1;
    setBooks([...books, book]);
  };

  const deleteBook = (id) => {
    console.log(id);
    const index = books.findIndex(x => x.id === id);
    if (index < 0) return;
    const newBook = [...books];
    console.log(newBook);
    newBook.splice(index, 1);
    setBooks(newBook);
  };

  const [isEdit, setIsEdit] = useState(false);

  const initBook = {id: null, name: '', author: ''};

  const [currentBook, setCurrentBook] = useState(initBook);

  const editBook = (id, book) => {
    setIsEdit(true);
    setCurrentBook(book);
  }

  const updateBook = () => {

  }

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
          <h2 className="text-center text-uppercase">List Books</h2>
          <BookTable books={books}  deleteBook={deleteBook} editBook={editBook}/>
        </div>
      </div>
    </div>
  );
}

export default App;
