import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "../../pages/members/Members.css";

export default function MemberFormModal({
  member,
  onClose,
  onSave,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (member) {
      reset({
        fullName: member.fullName,
        email: member.email,
        phone: member.phone,
        address: member.address,
      });
    } else {
      reset({
        fullName: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [member, reset]);

  return (
    <div className="modal-overlay">
      <div className="book-modal">
        <h2>
          {member ? "Edit Member" : "Add Member"}
        </h2>

        <form onSubmit={handleSubmit(onSave)}>
          <div className="form-grid">

            <div className="form-group">
              <label>Full Name</label>

              <input
                {...register("fullName", {
                  required: "Full Name is required",
                })}
              />

              <span className="error">
                {errors.fullName?.message}
              </span>
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              <span className="error">
                {errors.email?.message}
              </span>
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                {...register("phone")}
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>

              <textarea
                rows={3}
                {...register("address")}
              />
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
              {member ? "Update" : "Save"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}