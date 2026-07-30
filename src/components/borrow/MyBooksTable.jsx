export default function MyBooksTable({ data }) {

    console.log("MyBooksTable data:", data);
  return (
    <div className="table-wrapper">

      <table className="data-table">

        <thead>

          <tr>

            <th>Book</th>

            <th>Borrow Date</th>

            <th>Due Date</th>

            <th>Return Date</th>

            <th>Status</th>

            <th>Fine</th>

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>

              <td colSpan="6">

                No borrowed books found.

              </td>

            </tr>

          ) : (

            data.map(book => (

              <tr key={book.borrowRecordId}>

                <td>{book.bookTitle}</td>

                <td>

                  {new Date(book.borrowDate).toLocaleDateString()}

                </td>

                <td>

                  {new Date(book.dueDate).toLocaleDateString()}

                </td>

                <td>

                  {book.returnDate
                    ? new Date(book.returnDate).toLocaleDateString()
                    : "-"}

                </td>

                <td>

                  <span
                    className={`status ${book.status.toLowerCase()}`}
                  >
                    {book.status}
                  </span>

                </td>

                <td>

                  {book.fineAmount}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}