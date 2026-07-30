import {
  FaBook,
  FaBookmark,
  FaExclamationTriangle,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function MemberSummaryCards({
  dashboard,
}) {
  const cards = [
    {
      title: "Borrowed Books",
      value:
        dashboard.borrowedBooksCount,
      icon: <FaBook />,
      color: "#2563eb",
    },
    {
      title: "Reservations",
      value:
        dashboard.activeReservationsCount,
      icon: <FaBookmark />,
      color: "#059669",
    },
    {
      title: "Overdue Books",
      value:
        dashboard.overdueBooksCount,
      icon: <FaExclamationTriangle />,
      color: "#dc2626",
    },
    {
      title: "Total Fine",
      value: `৳ ${dashboard.totalFine}`,
      icon: <FaMoneyBillWave />,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <div
          className="summary-card"
          key={card.title}
        >
          <div
            className="summary-icon"
            style={{
              background: card.color,
            }}
          >
            {card.icon}
          </div>

          <div>

            <h4>{card.title}</h4>

            <h2>{card.value}</h2>

          </div>

        </div>
      ))}
    </div>
  );
}