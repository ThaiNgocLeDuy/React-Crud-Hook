import React, { useEffect, useState } from "react";

function EditBookForm(props) {
  useEffect(() => {
    setBook(props.currentBook);
  }, [props]);

  const [book, setBook] = useState(props.currentBook);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (book.name && book.author) props.updateBook(book);
  };

  const handleSetEditing = () => {
      props.setIsEdit(false);
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
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmitForm}
      >
        ADD
      </button>
      <button
        type="submit"
        className="btn btn-danger"
        onClick={handleSetEditing}
      >
        CANCEL
      </button>
    </form>
  );
}

export default EditBookForm;
