import { useEffect, useState } from "react";

import "./Books.css";

export default function BookForm({

    initialData,

    branches,

    onSubmit,

    onCancel

}) {

    const [form, setForm] = useState({

        title: "",

        author: "",

        isbn: "",

        quantity: 1,

        branchId: ""

    });

    useEffect(() => {

        if (initialData) {

            setForm({

                title: initialData.title,

                author: initialData.author,

                isbn: initialData.isbn,

                quantity: initialData.quantity,

                branchId: initialData.branchId

            });

        }

    }, [initialData]);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    {initialData ? "Edit Book" : "Add Book"}

                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="author"
                        placeholder="Author"
                        value={form.author}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="isbn"
                        placeholder="ISBN"
                        value={form.isbn}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        min="1"
                    />

                    <select
                        name="branchId"
                        value={form.branchId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">

                            Select Branch

                        </option>

                        {

                            branches.map(branch => (

                                <option
                                    key={branch.id}
                                    value={branch.id}
                                >

                                    {branch.name}

                                </option>

                            ))

                        }

                    </select>

                    <div className="modal-actions">

                        <button type="submit">

                            Save

                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}