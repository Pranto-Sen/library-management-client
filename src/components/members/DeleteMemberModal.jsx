import "../../pages/members/Members.css";

export default function DeleteMemberModal({
  member,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2>Delete Member</h2>

        <p>
          Are you sure you want to delete
          <b> {member.fullName}</b>?
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