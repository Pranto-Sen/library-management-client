export default function MyReservationsTable({ data }) {
  return (
    <div className="table-wrapper">

      <table className="data-table">

        <thead>

          <tr>

            <th>Book</th>

            <th>Reserved Date</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (
            <tr className="empty-row">
              <td colSpan="3">
                No reservations found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>

                <td>{item.bookTitle}</td>

                <td>
                  {new Date(
                    item.reservedAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <span
                    className={`status ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}