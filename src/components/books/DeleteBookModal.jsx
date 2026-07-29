import "../../pages/books/Books.css";

export default function DeleteBookModal({ book, onCancel, onConfirm }) {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2>Delete Book</h2>

        <p>
          Are you sure you want to delete <strong>{book.title}</strong>?
        </p>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
