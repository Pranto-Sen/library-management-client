import { FaPlus, FaSearch } from "react-icons/fa";

export default function BorrowToolbar({
  search,
  onSearch,
  onBorrow,
}) {
  return (
    <div className="toolbar">

      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search member, book..."
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
        />
      </div>

      <button
        className="primary-btn"
        onClick={onBorrow}
      >
        <FaPlus />

        Borrow Book
      </button>

    </div>
  );
}