import "../../pages/branches/Branches.css";

export default function DeleteBranchModal({
  branch,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        <h2>Delete Branch</h2>

        <p>

          Delete

          <b> {branch.name}</b>

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
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}