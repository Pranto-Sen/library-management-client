import "./Dashboard.css";

export default function RecentBorrowTable({ data }) {
  return (
    <div className="table-card">
      <h3>Recent Borrows</h3>

      <table>
        <thead>
          <tr>
            <th>Member</th>

            <th>Book</th>

            <th>Borrow Date</th>

            <th>Due Date</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No Data
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.borrowRecordId}>
                <td>{item.memberName}</td>

                <td>{item.bookTitle}</td>

                <td>{new Date(item.borrowDate).toLocaleDateString()}</td>

                <td>{new Date(item.dueDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
