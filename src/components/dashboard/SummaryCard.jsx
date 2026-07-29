import "./Dashboard.css";

export default function SummaryCard({

    title,

    value,

    color

}) {

    return (

        <div
            className="summary-card"
            style={{
                borderLeft: `5px solid ${color}`
            }}
        >

            <h4>

                {title}

            </h4>

            <h2>

                {value}

            </h2>

        </div>

    );

}