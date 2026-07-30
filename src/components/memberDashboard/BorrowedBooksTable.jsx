export default function BorrowedBooksTable({
  data,
}) {
  return (
    <div className="dashboard-table">

      <h3>My Borrowed Books</h3>

      <table className="data-table">

        <thead>

          <tr>

            <th>Book</th>

            <th>Borrow Date</th>

            <th>Due Date</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {data.map((book) => (

            <tr key={book.borrowRecordId}>

              <td>{book.bookTitle}</td>

              <td>

                {new Date(
                  book.borrowDate
                ).toLocaleDateString()}

              </td>

              <td>

                {new Date(
                  book.dueDate
                ).toLocaleDateString()}

              </td>

              <td>

                <span
                  className={
                    book.isOverdue
                      ? "status overdue"
                      : "status active"
                  }
                >

                  {book.isOverdue
                    ? "Overdue"
                    : "Borrowed"}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}