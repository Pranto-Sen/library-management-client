import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import "./Reservations.css";

import {
    getReservations,
    createReservation,
    cancelReservation,
    checkoutReservation,
} from "../../services/reservationService";

import { getMembers } from "../../services/memberService";
import { getBooks } from "../../services/bookService";

import ReservationToolbar from "../../components/reservations/ReservationToolbar";
import ReservationTable from "../../components/reservations/ReservationTable";
import ReservationFormModal from "../../components/reservations/ReservationFormModal";
import CancelReservationModal from "../../components/reservations/CancelReservationModal";
import CheckoutReservationModal from "../../components/reservations/CheckoutReservationModal";

export default function ReservationsPage() {
    const [reservations, setReservations] = useState([]);
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [cancelItem, setCancelItem] = useState(null);

    const [checkoutItem, setCheckoutItem] = useState(null);

    async function loadReservations() {
        const response = await getReservations();

        setReservations(response);
    }

    console.log("Reservations:", books);

    async function loadMembers() {
        const response = await getMembers();

        setMembers(response.data.items);
    }

    async function loadBooks() {
        const response = await getBooks();

         console.log("Reservations:", response.items);

        setBooks(
            response.items.filter(
                (book) => book.availableQuantity  === 0
            )
        );
    }

    async function loadData() {
        try {
            setLoading(true);

            await Promise.all([
                loadReservations(),
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

        if (!keyword) return reservations;

        return reservations.filter((item) =>
            item.memberName
                ?.toLowerCase()
                .includes(keyword) ||
            item.bookTitle
                ?.toLowerCase()
                .includes(keyword) ||
            item.status
                ?.toLowerCase()
                .includes(keyword)
        );
    }, [reservations, search]);

    async function handleReserve(data) {
        try {
            await createReservation(data);

            toast.success(
                "Reservation created."
            );

            setShowForm(false);

            loadData();
        } catch (error) {
            toast.error(
                error.response?.data?.Message ||
                "Reservation failed."
            );
        }
    }

    async function handleCancel() {
        try {
            await cancelReservation(cancelItem.id);

            toast.success(
                "Reservation cancelled."
            );

            setCancelItem(null);

            loadData();
        } catch (error) {
            toast.error(
                error.response?.data?.Message ||
                "Cancel failed."
            );
        }
    }

    async function handleCheckout() {
        try {
            await checkoutReservation(
                checkoutItem.id
            );

            toast.success(
                "Checkout completed."
            );

            setCheckoutItem(null);

            loadData();
        } catch (error) {
            toast.error(
                error.response?.data?.Message ||
                "Checkout failed."
            );
        }
    }

    return (
        <div className="reservation-page">

            <ReservationToolbar
                search={search}
                onSearch={setSearch}
                onAdd={() => setShowForm(true)}
            />

            <ReservationTable
                reservations={filtered}
                loading={loading}
                onCancel={setCancelItem}
                onCheckout={setCheckoutItem}
            />

            {showForm && (
                <ReservationFormModal
                    members={members}
                    books={books}
                    onClose={() =>
                        setShowForm(false)
                    }
                    onSave={handleReserve}
                />
            )}

            {cancelItem && (
                <CancelReservationModal
                    reservation={cancelItem}
                    onCancel={() =>
                        setCancelItem(null)
                    }
                    onConfirm={handleCancel}
                />
            )}

            {checkoutItem && (
                <CheckoutReservationModal
                    reservation={checkoutItem}
                    onCancel={() =>
                        setCheckoutItem(null)
                    }
                    onConfirm={handleCheckout}
                />
            )}

        </div>
    );
}