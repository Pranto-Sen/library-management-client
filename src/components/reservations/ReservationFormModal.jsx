import { useForm } from "react-hook-form";

import "../../pages/reservations/Reservations.css";

export default function ReservationFormModal({
  members = [],
  books = [],
  onClose,
  onSave,
}) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm();

  return (
    <div className="modal-overlay">

      <div className="book-modal">

        <h2>Reserve Book</h2>

        <form onSubmit={handleSubmit(onSave)}>

          <div className="form-grid">

            <div className="form-group">

              <label>Member</label>

              <select
                {...register("memberId", {
                  required: "Member is required",
                })}
              >

                <option value="">
                  Select Member
                </option>

                {members.map((member) => (

                  <option
                    key={member.id}
                    value={member.id}
                  >
                    {member.fullName}
                  </option>

                ))}

              </select>

              <span className="error">
                {errors.memberId?.message}
              </span>

            </div>

            <div className="form-group">

              <label>Book</label>

              <select
                {...register("bookId", {
                  required: "Book is required",
                })}
              >

                <option value="">
                  Select Book
                </option>

                {books.map((book) => (

                  <option
                    key={book.id}
                    value={book.id}
                  >
                    {book.title}
                  </option>

                ))}

              </select>

              <span className="error">
                {errors.bookId?.message}
              </span>

            </div>

          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={isSubmitting}
            >
              Reserve
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}