import "../../pages/borrow/Borrow.css";

export default function ReturnBookModal({
  borrow,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        <h2>Return Book</h2>

        <p>

          Return

          <b> {borrow.bookTitle}</b>

          borrowed by

          <b> {borrow.memberName}</b>

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
            Return
          </button>

        </div>

      </div>

    </div>
  );
}