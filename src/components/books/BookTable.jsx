import "../../pages/books/Books.css";

export default function BookTable({
  books,

  onEdit,

  onDelete,
  isMember,
  isAdmin
}) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Title</th>

            <th>Author</th>

            <th>ISBN</th>

            <th>Copies</th>

            <th>Available</th>
            <th>Status</th>

            <th>Branch</th>

            {isAdmin && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="6">No Books Found</td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.isbn}</td>

                <td>{book.quantity}</td>

                <td>{book.availableQuantity}</td>
                <td>{book.status}</td>

                <td>{book.branchName}</td>
{isAdmin && (<td>
                  {/* <button className="edit-btn" onClick={() => onEdit(book)}>
                    Edit
                  </button>

                  <button>Delete</button> */}

                  <td>
                    <button className="edit-btn" onClick={() => onEdit(book)}>
                      ✏️
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(book)}
                    >
                      🗑️
                    </button>
                  </td>
                </td>)}
                
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
