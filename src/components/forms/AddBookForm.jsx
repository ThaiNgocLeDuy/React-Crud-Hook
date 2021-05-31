import React, { useState } from "react";

AddBookForm.propTypes = {};

function AddBookForm(props) {
  const initBook = { id: null, name: "", author: "" };

  const [book, setBook] = useState(initBook);

  const { addBook } = props;

  const handleChange = (e) => {
      console.log(e.target.value);
      const {name, value} = e.target;
      setBook({...book, [name]: value});
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (book.name && book.author) {
        handleChange(e, addBook(book));
    }
    setBook(initBook);
  };

  return (
    <form>
      <div className="form-group">
        <label>Name: </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={book.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Author: </label>
        <input
          type="text"
          className="form-control"
          name="author"
          value={book.author}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmitForm}>
        ADD
      </button>
    </form>
  );
}

export default AddBookForm;
