import { FaUndo } from "react-icons/fa";

export default function BorrowTable({
  records,
  loading,
  onReturn,
}) {
  if (loading)
    return (
      <div className="loading">
        Loading...
      </div>
    );

  if (!records.length)
    return (
      <div className="empty-state">
        No Borrow Record Found
      </div>
    );

  return (
    <table className="data-table">

      <thead>

        <tr>

          <th>Member</th>

          <th>Book</th>

          <th>Borrow Date</th>

          <th>Due Date</th>

          <th>Status</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {records.map((item) => (

          <tr key={item.borrowRecordId}>

            <td>{item.memberName}</td>

            <td>{item.bookTitle}</td>

            <td>
              {new Date(
                item.borrowDate
              ).toLocaleDateString()}
            </td>

            <td>
              {new Date(
                item.dueDate
              ).toLocaleDateString()}
            </td>

            <td>

              <span
                className={`status-badge ${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>

            </td>

            <td>

              {item.status !==
                "Returned" && (

                <button
                  className="return-btn"
                  onClick={() =>
                    onReturn(item)
                  }
                >
                  <FaUndo />

                  Return
                </button>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}