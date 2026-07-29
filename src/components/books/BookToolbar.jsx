import "../../pages/books/Books.css";


export default function BookToolbar({
    search,
    setSearch,
    onAdd
}) {
    return (
        <div className="toolbar">

            <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={onAdd}>
                Add Book
            </button>

        </div>
    );
}
