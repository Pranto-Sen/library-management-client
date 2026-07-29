import SummaryCard from "./SummaryCard";

export default function SummaryCards({ dashboard }) {
  const cards = [
    {
      title: "Books",
      value: dashboard.totalBooks,
      color: "#2563eb",
    },

    {
      title: "Members",
      value: dashboard.totalMembers,
      color: "#16a34a",
    },

    {
      title: "Users",
      value: dashboard.totalUsers,
      color: "#7c3aed",
    },

    {
      title: "Branches",
      value: dashboard.totalBranches,
      color: "#f59e0b",
    },

    {
      title: "Borrowed",
      value: dashboard.borrowedBooks,
      color: "#06b6d4",
    },

    {
      title: "Available",
      value: dashboard.availableBooks,
      color: "#22c55e",
    },

    {
      title: "Reservations",
      value: dashboard.activeReservations,
      color: "#d97706",
    },

    {
      title: "Overdue",
      value: dashboard.overdueBooksCount,
      color: "#dc2626",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <SummaryCard
          key={card.title}
          title={card.title}
          value={card.value}
          color={card.color}
        />
      ))}
    </div>
  );
}
