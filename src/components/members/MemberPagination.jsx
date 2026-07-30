export default function MemberPagination({
  pageNumber,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="pagination">
      <button
        disabled={pageNumber === 1}
        onClick={() =>
          onPageChange(pageNumber - 1)
        }
      >
        Previous
      </button>

      <span>
        Page {pageNumber} of {totalPages}
      </span>

      <button
        disabled={pageNumber === totalPages}
        onClick={() =>
          onPageChange(pageNumber + 1)
        }
      >
        Next
      </button>
    </div>
  );
}