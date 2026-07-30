import { FaPlus, FaSearch } from "react-icons/fa";

export default function ReservationToolbar({
  search,
  onSearch,
  onAdd,
}) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search reservation..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <button
        className="primary-btn"
        onClick={onAdd}
      >
        <FaPlus />

        Reserve Book
      </button>
    </div>
  );
}