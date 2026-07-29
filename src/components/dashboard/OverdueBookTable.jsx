import "./Dashboard.css";

export default function OverdueBookTable({ data }) {
  return (
    <div className="table-card">
      <h3>Overdue Books</h3>

      <table>
        <thead>
          <tr>
            <th>Member</th>

            <th>Book</th>

            <th>Due Date</th>

            <th>Days</th>
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

                <td>{new Date(item.dueDate).toLocaleDateString()}</td>

                <td>
                  {item.overdueDays} Day{item.overdueDays > 1 ? "s" : ""}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
