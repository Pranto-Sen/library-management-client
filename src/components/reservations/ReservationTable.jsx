import {
  FaTimes,
  FaCheck
} from "react-icons/fa";

export default function ReservationTable({
  reservations,
  loading,
  onCancel,
  onCheckout,
}) {
  if (loading)
    return (
      <div className="loading">
        Loading...
      </div>
    );

  if (!reservations.length)
    return (
      <div className="empty-state">
        No Reservation Found
      </div>
    );

  return (
    <table className="data-table">

      <thead>

        <tr>

          <th>Member</th>

          <th>Book</th>

          <th>Reservation Date</th>

          <th>Status</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {reservations.map((item) => (

          <tr key={item.id}>

            <td>{item.memberName}</td>

            <td>{item.bookTitle}</td>

            <td>
              {new Date(
                item.reservedAt
              ).toLocaleDateString()}
            </td>

            <td>

              <span
                className={`reservation-status ${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>

            </td>

            <td>

              {item.status ===
                "Pending" && (

                <>

                  <button
                    className="checkout-btn"
                    onClick={() =>
                      onCheckout(item)
                    }
                  >
                    <FaCheck />

                    Checkout
                  </button>

                  <button
                    className="cancel-reservation-btn"
                    onClick={() =>
                      onCancel(item)
                    }
                  >
                    <FaTimes />

                    Cancel
                  </button>

                </>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}