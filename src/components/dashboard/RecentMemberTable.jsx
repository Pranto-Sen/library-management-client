import "./Dashboard.css";

export default function RecentMemberTable({ data }) {

    return (

        <div className="table-card">

            <h3>Recent Members</h3>

            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        data.length === 0 ? (

                            <tr>

                                <td colSpan="2" className="no-data">

                                    No Data

                                </td>

                            </tr>

                        ) : (

                            data.map(item => (

                                <tr key={item.memberId}>

                                    <td>{item.fullName}</td>

                                    <td>{item.email}</td>

                                </tr>

                            ))

                        )
                    }

                </tbody>

            </table>

        </div>

    );

}