import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import "./Books.css";

import { useAuth } from "../../context/AuthContext";

import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/bookService";

import { getBranches } from "../../services/branchService";

import BookToolbar from "../../components/books/BookToolbar";
import BookTable from "../../components/books/BookTable";
import DeleteBookModal from "../../components/books/DeleteBookModal";
import Pagination from "../../components/common/Pagination";

import BookForm from "./BookForm";

export default function BooksPage() {
  const { user } = useAuth();

  const isAdmin = user?.role === "Admin";
  const isMember = user?.role === "Member";

  const pageSize = 10;

  const [books, setBooks] = useState([]);
  const [branches, setBranches] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);

  const [editingBook, setEditingBook] = useState(null);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      await Promise.all([
        loadBooks(),
        loadBranches(),
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function loadBooks() {
    const response = await getBooks();

    setBooks(response.items);
  }

  async function loadBranches() {
    const response = await getBranches();

    setBranches(response);
  }

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return books;

    const keyword = search.toLowerCase();

    return books.filter((book) =>
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword) ||
      book.isbn.toLowerCase().includes(keyword) ||
      book.branchName.toLowerCase().includes(keyword)
    );
  }, [books, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / pageSize)
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredBooks.slice(
      start,
      start + pageSize
    );
  }, [filteredBooks, page]);

  async function saveBook(data) {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, {
          ...data,
          id: editingBook.id,
        });

        toast.success(
          "Book updated successfully."
        );
      } else {
        await createBook(data);

        toast.success(
          "Book created successfully."
        );
      }

      setShowForm(false);

      setEditingBook(null);

      loadBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.Message ||
          error.response?.data?.message ||
          "Something went wrong."
      );
    }
  }

  async function deleteCurrentBook() {
    try {
      await deleteBook(selectedBook.id);

      toast.success(
        "Book deleted successfully."
      );

      setShowDelete(false);

      setSelectedBook(null);

      loadBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.Message ||
          "Delete failed."
      );
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="books-page">

      <BookToolbar
        showAdd={isAdmin}
        search={search}
        setSearch={setSearch}
        onAdd={() => {
          setEditingBook(null);
          setShowForm(true);
        }}
      />

      <BookTable
        books={paginatedBooks}
        isAdmin={isAdmin}
        isMember={isMember}
        onEdit={(book) => {
          setEditingBook(book);
          setShowForm(true);
        }}
        onDelete={(book) => {
          setSelectedBook(book);
          setShowDelete(true);
        }}
      />

      {showForm && (
        <BookForm
          initialData={editingBook}
          branches={branches}
          onSubmit={saveBook}
          onCancel={() =>
            setShowForm(false)
          }
        />
      )}

      {showDelete && (
        <DeleteBookModal
          book={selectedBook}
          onCancel={() =>
            setShowDelete(false)
          }
          onConfirm={deleteCurrentBook}
        />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>
  );
}