import "../../pages/books/Books.css";

export default function BookTable({ books }) {
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

            <th>Action</th>
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

                <td>
                  <button

    onClick={() => onEdit(book)}

>

    Edit

</button>

                  <button>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
