import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { getMemberId } from "../../services/memberService";
import { getBorrowHistory } from "../../services/borrowService";

import MyBooksTable from "../../components/borrow/MyBooksTable";

import "./Borrow.css";

export default function MyBooksPage() {
  const { user } = useAuth();

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      // First API
      const memberId = await getMemberId(user.id);

      // Second API
      const data = await getBorrowHistory(memberId);

      setBooks(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <h2>Loading...</h2>;

  return (
    <div className="page-container">

      <div className="page-header">

        <h2>My Borrowed Books</h2>

      </div>

      <MyBooksTable data={books} />

    </div>
  );
}