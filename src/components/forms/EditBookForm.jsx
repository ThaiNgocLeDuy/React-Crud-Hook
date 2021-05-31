import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

EditBookForm.propTypes = {
  currentBook: PropTypes.object,
  updateBook: PropTypes.func,
  setIsEdit: PropTypes.func,
};

EditBookForm.defaultProps = {
    currentBook: {},
    updateBook: null,
    setIsEdit: false,
};

function EditBookForm(props) {
  const { currentBook, updateBook, setIsEdit } = props;

  useEffect(() => {
    setBook(currentBook);
  }, [currentBook]);

  const [book, setBook] = useState(currentBook);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (book.name && book.author) updateBook(book);
  };

  const handleSetEditing = () => {
    setIsEdit(false);
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
        SAVE
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
