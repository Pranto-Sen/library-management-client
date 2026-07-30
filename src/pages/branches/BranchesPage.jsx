import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import "./Branches.css";

import {

  getBranches,

  createBranch,

  updateBranch,

  deleteBranch,

}

from "../../services/branchService";

import BranchToolbar from "../../components/branches/BranchToolbar";

import BranchTable from "../../components/branches/BranchTable";

import BranchFormModal from "../../components/branches/BranchFormModal";

import DeleteBranchModal from "../../components/branches/DeleteBranchModal";

export default function BranchesPage() {

  const [branches, setBranches] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingBranch, setEditingBranch] =
    useState(null);

  const [deleteItem, setDeleteItem] =
    useState(null);

  async function loadBranches() {

    try {

      setLoading(true);

      const response =
        await getBranches();

        console.log(response);

      setBranches(response);

    }

    catch {

      toast.error(
        "Failed to load branches."
      );

    }

    finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadBranches();

  }, []);

  const filtered = useMemo(() => {

    const keyword =
      search.trim().toLowerCase();

    if (!keyword)
      return branches;

    return branches.filter(branch =>

      [

        branch.name,

        branch.address,

      ]

        .filter(Boolean)

        .some(value =>

          value
            .toLowerCase()
            .includes(keyword)

        )

    );

  }, [branches, search]);

  async function handleSave(data) {

    try {

      if (editingBranch) {

        await updateBranch(
          editingBranch.id,
          data
        );

        toast.success(
          "Branch updated."
        );

      }

      else {

        await createBranch(data);

        toast.success(
          "Branch created."
        );

      }

      setShowForm(false);

      setEditingBranch(null);

      loadBranches();

    }

    catch {

      toast.error(
        "Operation failed."
      );

    }

  }

  async function handleDelete() {

    try {

      await deleteBranch(deleteItem.id);

      toast.success(
        "Branch deleted."
      );

      setDeleteItem(null);

      loadBranches();

    }

    catch {

      toast.error(
        "Delete failed."
      );

    }

  }

  return (

    <div className="branches-page">

      <BranchToolbar

        search={search}

        onSearch={setSearch}

        onAdd={() => {

          setEditingBranch(null);

          setShowForm(true);

        }}

      />

      <BranchTable

        branches={filtered}

        loading={loading}

        onEdit={branch => {

          setEditingBranch(branch);

          setShowForm(true);

        }}

        onDelete={setDeleteItem}

      />

      {

        showForm &&

        <BranchFormModal

          branch={editingBranch}

          onClose={() => {

            setShowForm(false);

            setEditingBranch(null);

          }}

          onSave={handleSave}

        />

      }

      {

        deleteItem &&

        <DeleteBranchModal

          branch={deleteItem}

          onCancel={() =>

            setDeleteItem(null)

          }

          onConfirm={handleDelete}

        />

      }

    </div>

  );

}