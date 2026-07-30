import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import "./Borrow.css";

import {
    getBorrowRecords,
    borrowBook,
    returnBook,
} from "../../services/borrowService";

import { getMembers } from "../../services/memberService";
import { getBooks } from "../../services/bookService";

import BorrowToolbar from "../../components/borrow/BorrowToolbar";
import BorrowTable from "../../components/borrow/BorrowTable";
import BorrowFormModal from "../../components/borrow/BorrowFormModal";
import ReturnBookModal from "../../components/borrow/ReturnBookModal";

export default function BorrowPage() {
    const [records, setRecords] = useState([]);
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showBorrowModal, setShowBorrowModal] = useState(false);

    const [selectedBorrow, setSelectedBorrow] = useState(null);

    async function loadBorrowRecords() {
        const response = await getBorrowRecords();
        setRecords(response.data.items);
    }

//     const filtered = useMemo(() => {
//     if (!Array.isArray(records)) return [];

//     const keyword = search.trim().toLowerCase();

//     if (!keyword) return records;

//     return records.filter((record) => {
//         return (
//             record.memberName?.toLowerCase().includes(keyword) ||
//             record.bookTitle?.toLowerCase().includes(keyword) ||
//             record.status?.toLowerCase().includes(keyword)
//         );
//     });
// }, [records, search]);

    // async function loadMembers() {
    //     const response = await getMembers();
    //     setMembers(response.items);
    // }

    // async function loadBooks() {
    //     const response = await getBooks();

    //     setBooks(
    //         response.items.filter(
    //             (book) => book.availableQuantity > 0
    //         )
    //     );
    // }

    async function loadMembers() {
    const response = await getMembers();

    console.log("Members Response:", response);

    setMembers(response.data.items);
}

async function loadBooks() {
    const response = await getBooks();

    console.log("Books Response:", response);

    setBooks(response.items);
}

    async function loadData() {
        try {
            setLoading(true);

            await Promise.all([
                loadBorrowRecords(),
                loadMembers(),
                loadBooks(),
            ]);
        } catch {
            toast.error("Failed to load data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const filtered = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return records;

        return records.filter((x) =>
            [x.memberName, x.bookTitle, x.status]
                .filter(Boolean)
                .some((v) =>
                    v.toLowerCase().includes(keyword)
                )
        );
    }, [records, search]);

    console.log("xzx:", records);

    async function handleBorrow(data) {
        try {
            await borrowBook(data);

            toast.success("Book borrowed successfully.");

            setShowBorrowModal(false);

            loadData();
        } catch (error) {
        const message =
            error.response?.data?.Message ||
            error.response?.data?.message ||
            "Borrow failed.";

        toast.error(message);
    }
    }

    async function handleReturn() {
        try {
            await returnBook(selectedBorrow.id);

            toast.success("Book returned successfully.");

            setSelectedBorrow(null);

            loadData();
        } catch {
            toast.error("Return failed.");
        }
    }

    return (
        <div className="borrow-page">
            <BorrowToolbar
                search={search}
                onSearch={setSearch}
                onBorrow={() => setShowBorrowModal(true)}
            />

            <BorrowTable
                records={filtered}
                loading={loading}
                onReturn={setSelectedBorrow}
            />

            {showBorrowModal && (
                <BorrowFormModal
                    members={members}
                    books={books}
                    onClose={() =>
                        setShowBorrowModal(false)
                    }
                    onSave={handleBorrow}
                />
            )}

            {selectedBorrow && (
                <ReturnBookModal
                    borrow={selectedBorrow}
                    onCancel={() =>
                        setSelectedBorrow(null)
                    }
                    onConfirm={handleReturn}
                />
            )}
        </div>
    );
}