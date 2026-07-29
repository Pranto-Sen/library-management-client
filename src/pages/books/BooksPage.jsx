import { useEffect, useState } from "react";

import { getBooks } from "../../services/bookService";

import BookToolbar from "../../components/books/BookToolbar";

import BookTable from "../../components/books/BookTable";
import DeleteBookModal from "../../components/books/DeleteBookModal";

import BookForm from "./BookForm";

import Pagination from "../../components/common/Pagination";

import "./Books.css";
import { getBranches } from "../../services/branchService";
import { createBook, updateBook, deleteBook } from "../../services/bookService";

export default function BooksPage() {
  //   const [books, setBooks] = useState({
  //     items: [],
  //     pageNumber: 1,
  //     pageSize: 10,
  //     totalCount: 0,
  //     totalPages: 0,
  //   });

  const [books, setBooks] = useState([]);

  const [filteredBooks, setFilteredBooks] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);

  const [editingBook, setEditingBook] = useState(null);

  const [branches, setBranches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);
  //   const [search, setSearch] = useState("");

  useEffect(() => {
    loadBooks();
    loadBranches();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredBooks(books);

      return;
    }

    const keyword = search.toLowerCase();

    const result = books.filter(
      (book) =>
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword) ||
        book.isbn.toLowerCase().includes(keyword) ||
        book.branchName.toLowerCase().includes(keyword),
    );

    setFilteredBooks(result);
  }, [search, books]);

  async function loadBooks() {
    try {
      const response = await getBooks();

      setBooks(response.items);

      setFilteredBooks(response.items);
    } finally {
      setLoading(false);
    }
  }
  async function loadBranches() {
    const result = await getBranches();

    setBranches(result);
  }
  async function saveBook(data) {
    try {
      if (editingBook) {
        await updateBook(
          editingBook.id,

          {
            ...data,

            id: editingBook.id,
          },
        );
      } else {
        await createBook(data);
      }

      setShowForm(false);

      loadBooks();
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCurrentBook() {
    try {
      await deleteBook(selectedBook.id);

      setShowDelete(false);

      loadBooks();
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="books-page">
      <BookToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => {
          setEditingBook(null);
          setShowForm(true);
        }}
      />
      {/* <BookTable
        books={filteredBooks}
        onEdit={(book) => {
          setEditingBook(book);

          setShowForm(true);
        }}
      /> */}
      <BookTable
        books={filteredBooks}
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
          onCancel={() => setShowForm(false)}
        />
      )}
      {showDelete && (
        <DeleteBookModal
          book={selectedBook}
          onCancel={() => setShowDelete(false)}
          onConfirm={deleteCurrentBook}
        />
      )}

      <Pagination
        page={books.pageNumber}
        totalPages={books.totalPages}
        setPage={setPage}
      />
    </div>
  );
}
