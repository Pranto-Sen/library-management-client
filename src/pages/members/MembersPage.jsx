import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import "./Members.css";

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../../services/memberService";

import MemberToolbar from "../../components/members/MemberToolbar";
import MemberTable from "../../components/members/MemberTable";
import MemberFormModal from "../../components/members/MemberFormModal";
import DeleteMemberModal from "../../components/members/DeleteMemberModal";
import MemberPagination from "../../components/members/MemberPagination";

export default function MembersPage() {
  const [members, setMembers] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize] = useState(10);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingMember, setEditingMember] = useState(null);

  const [deleteItem, setDeleteItem] = useState(null);

  async function loadMembers() {
    try {
      setLoading(true);

      const response = await getMembers(pageNumber, pageSize);

      setMembers(response.data.items);

      setTotalPages(response.data.totalPages);
    } catch {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, [pageNumber]);

  const filteredMembers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return members;

    return members.filter((m) =>
      [
        m.fullName,
        m.email,
        m.phoneNumber,
        m.membershipNumber,
      ]
        .filter(Boolean)
        .some((value) =>
          value.toLowerCase().includes(keyword)
        )
    );
  }, [members, search]);

  async function handleSave(data) {
    try {
      if (editingMember) {
        await updateMember(editingMember.id, data);

        toast.success("Member updated");
      } else {
        await createMember(data);

        toast.success("Member added");
      }

      setShowForm(false);

      setEditingMember(null);

      loadMembers();
    } catch {
      toast.error("Operation failed");
    }
  }

  async function handleDelete() {
    try {
      await deleteMember(deleteItem.id);

      toast.success("Member deleted");

      setDeleteItem(null);

      loadMembers();
    } catch {
      toast.error("Delete failed");
    }
  }

  return (
    <div className="members-page">
      <MemberToolbar
        search={search}
        onSearch={setSearch}
        onAdd={() => {
          setEditingMember(null);
          setShowForm(true);
        }}
      />

      <MemberTable
        members={filteredMembers}
        loading={loading}
        onEdit={(member) => {
          setEditingMember(member);
          setShowForm(true);
        }}
        onDelete={setDeleteItem}
      />

      <MemberPagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        onPageChange={setPageNumber}
      />

      {showForm && (
        <MemberFormModal
          member={editingMember}
          onClose={() => {
            setShowForm(false);
            setEditingMember(null);
          }}
          onSave={handleSave}
        />
      )}

      {deleteItem && (
        <DeleteMemberModal
          member={deleteItem}
          onCancel={() => setDeleteItem(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}