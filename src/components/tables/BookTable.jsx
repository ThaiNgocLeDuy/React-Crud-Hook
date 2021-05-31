import React from "react";
import PropTypes from "prop-types";

BookTable.propTypes = {
  books: PropTypes.array,
  deleteBook: PropTypes.func,
  editBook: PropTypes.func,
};

BookTable.defaultProps = {
    books: [],
    deleteBook: null,
    editBook: null,
};

function BookTable(props) {
    const {deleteBook, editBook} = props;

    const handleClickDeleteButton = (id) => {
        console.log(id);
        if (deleteBook) {
            deleteBook(id);
        }
    }

    const handleClickEditButton = (id, book) => {
        console.log(id);
        console.log(book);
        if (editBook) {
            editBook(id, book);
        }
    }

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th className="text-center">ID</th>
          <th className="text-center">NAME</th>
          <th className="text-center">AUTHOR</th>
          <th className="text-center">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {props.books.length > 0 ? (
          props.books.map((book) => {
            const { id, name, author } = book; //es6 syntax
            return (
              <tr key={id}>
                <td className="text-center">{id}</td>
                <td>{name}</td>
                <td className="text-center">{author}</td>
                <td className="text-center">
                  <button 
                    className="btn btn-danger mr-1"
                    onClick={() => handleClickDeleteButton(id)}
                  >
                      DELETE
                  </button>
                  <button
                   className="btn btn-warning"
                   onClick={() => handleClickEditButton(id, book)}
                   >
                       EDIT
                    </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={8}>No Books found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default BookTable;
