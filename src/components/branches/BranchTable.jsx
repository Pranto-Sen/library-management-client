import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function BranchTable({
  branches,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading)
    return (
      <div className="loading">
        Loading...
      </div>
    );

  if (!branches.length)
    return (
      <div className="empty-state">
        No Branch Found
      </div>
    );

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>

          <th>Address</th>

          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {branches.map((branch) => (
          <tr key={branch.id}>
            <td>{branch.name}</td>

            <td>{branch.address}</td>

            <td>

              <button
                className="icon-btn edit"
                onClick={() =>
                  onEdit(branch)
                }
              >
                <FaEdit />
              </button>

              <button
                className="icon-btn delete"
                onClick={() =>
                  onDelete(branch)
                }
              >
                <FaTrash />
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}