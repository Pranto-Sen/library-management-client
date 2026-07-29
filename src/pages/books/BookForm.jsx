import { useEffect, useState } from "react";

import "./Books.css";

export default function BookForm({
  initialData,

  branches,

  onSubmit,

  onCancel,
}) {
  const [form, setForm] = useState({
    title: "",

    author: "",

    isbn: "",

    quantity: 1,

    branchId: "",
  });

  useEffect(() => {
    if (initialData) {
      const selectedBranch = branches.find(
        (branch) => branch.name === initialData.branchName,
      );

      setForm({
        title: initialData.title,

        author: initialData.author,

        isbn: initialData.isbn,

        quantity: initialData.quantity,

        branchId: selectedBranch?.id || "",
      });
    }
  }, [initialData, branches]);

  //   useEffect(() => {
  //     if (initialData) {
  //       setForm({
  //         title: initialData.title,

  //         author: initialData.author,

  //         isbn: initialData.isbn,

  //         quantity: initialData.quantity,

  //         branchId: initialData.branchId,
  //       });
  //     }
  //   }, [initialData]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(form);
  }

  return (
    <div className="modal-overlay">
      <div className="book-modal">
        <div className="modal-header">
          <h2>{initialData ? "Edit Book" : "Add New Book"}</h2>

          <button className="close-btn" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Author</label>

              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>ISBN</label>

              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="form-group full-width">
              <label>Branch</label>

              <select
                name="branchId"
                value={form.branchId}
                onChange={handleChange}
              >
                <option value="">Select Branch</option>

                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
