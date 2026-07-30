import { useForm } from "react-hook-form";

import "../../pages/borrow/Borrow.css";

export default function BorrowFormModal({
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
    } = useForm({
        defaultValues: {
            memberId: "",
            bookId: "",
            borrowDays: 7,
        },
    });

    return (
        <div className="modal-overlay">
            <div className="book-modal">
                <h2>Borrow Book</h2>

                <form onSubmit={handleSubmit(onSave)}>

                    <div className="form-grid">

                        {/* Member */}

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

                                {members.length > 0 ? (
                                    members.map((member) => (
                                        <option
                                            key={member.id}
                                            value={member.id}
                                        >
                                            {member.fullName}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>
                                        No Members Found
                                    </option>
                                )}
                            </select>

                            <span className="error">
                                {errors.memberId?.message}
                            </span>
                        </div>

                        {/* Book */}

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

                                {books.length > 0 ? (
                                    books.map((book) => (
                                        <option
                                            key={book.id}
                                            value={book.id}
                                        >
                                            {book.title} ({book.availableQuantity} Available)
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>
                                        No Books Available
                                    </option>
                                )}
                            </select>

                            <span className="error">
                                {errors.bookId?.message}
                            </span>
                        </div>

                        {/* Borrow Days */}

                        <div className="form-group">
                            <label>Borrow Days</label>

                            <input
                                type="number"
                                min="1"
                                {...register("borrowDays", {
                                    required: "Borrow days is required",
                                    min: {
                                        value: 1,
                                        message: "Minimum borrow days is 1",
                                    },
                                })}
                            />

                            <span className="error">
                                {errors.borrowDays?.message}
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
                            disabled={
                                isSubmitting ||
                                members.length === 0 ||
                                books.length === 0
                            }
                        >
                            {isSubmitting ? "Borrowing..." : "Borrow"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}