export default function ReservationTable({
  data,
}) {
  return (
    <div className="dashboard-table">

      <h3>My Reservations</h3>

      <table className="data-table">

        <thead>

          <tr>

            <th>Book</th>

            <th>Reserved At</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr key={item.reservationId}>

              <td>{item.bookTitle}</td>

              <td>

                {new Date(
                  item.reservedAt
                ).toLocaleDateString()}

              </td>

              <td>

                <span className="status pending">

                  {item.status}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}