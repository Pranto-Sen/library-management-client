import { FaEdit, FaTrash } from "react-icons/fa";

export default function MemberTable({
  members,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading)
    return <div className="loading">Loading...</div>;

  if (!members.length)
    return (
      <div className="empty-state">
        No members found.
      </div>
    );

  return (
    <table className="data-table">
      <thead>
        <tr>
        <th>Membership</th>
          <th>Name</th>

          <th>Email</th>

          <th>Phone</th>

          
          <th>Address</th>

          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
             <td>{member.id.slice(-6)}</td>
            <td>{member.fullName}</td>

            <td>{member.email}</td>

            <td>{member.phone}</td>

           

            <td>{member.address}</td>

            <td>
              <button
                className="icon-btn edit"
                onClick={() => onEdit(member)}
              >
                <FaEdit />
              </button>

              <button
                className="icon-btn delete"
                onClick={() => onDelete(member)}
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