import { FaPlus, FaSearch } from "react-icons/fa";

export default function MemberToolbar({
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
          placeholder="Search members..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* <button
        className="primary-btn"
        onClick={onAdd}
      >
        <FaPlus />

        Add Member
      </button> */}
    </div>
  );
}