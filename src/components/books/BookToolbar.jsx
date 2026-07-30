import "../../pages/books/Books.css";

export default function BookToolbar({ search, setSearch, onAdd,showAdd }) {
  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {showAdd && (

<button
className="primary-btn"
onClick={onAdd}
>

Add Book

</button>

)}

      {/* <button onClick={onAdd}>Add Book</button> */}
    </div>
  );
}
