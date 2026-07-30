import "../../pages/reservations/Reservations.css";

export default function CancelReservationModal({
  reservation,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        <h2>Cancel Reservation</h2>

        <p>

          Cancel reservation for

          <b>
            {" "}
            {reservation.bookTitle}
          </b>

          ?

        </p>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            No
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Yes
          </button>

        </div>

      </div>

    </div>
  );
}