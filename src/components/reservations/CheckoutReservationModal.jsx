import "../../pages/reservations/Reservations.css";

export default function CheckoutReservationModal({
  reservation,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        <h2>Checkout Reservation</h2>

        <p>

          Checkout

          <b>
            {" "}
            {reservation.bookTitle}
          </b>

          for

          <b>
            {" "}
            {reservation.memberName}
          </b>

          ?

        </p>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={onConfirm}
          >
            Checkout
          </button>

        </div>

      </div>

    </div>
  );
}