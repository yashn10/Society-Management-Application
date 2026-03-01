import React, { useState, useEffect } from 'react'
import axios from 'axios';


const Selllist = () => {

    const [selllist, setselllist] = useState([]);


    const getData = async () => {
        try {
            const response = await axios.get(`https://society-management-application.onrender.com/selllist/selllist`);

            if (response.status === 200) {
                const sellData = response.data.data;
                const memberData = await Promise.all(
                    sellData.map(async (item) => {
                        const memberResponse = await axios.get(`https://society-management-application.onrender.com/member/member/${item.memberid}`);
                        const member = memberResponse.data.member;

                        let societyName = "N/A";
                        if (member.society) {
                            const societyResponse = await axios.get(`https://society-management-application.onrender.com/society/getsociety/${member.society}`);
                            societyName = societyResponse.data.data.name;
                        }

                        return {
                            ...item,
                            member,
                            societyName
                        };
                    })
                );
                setselllist(memberData);
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching sell data:', error.response ? error.response.data : error.message);
            window.alert("Error occurs");
        }

    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div className="fade-in">
            <h4 className="text-gradient fw-bold mb-4"><i className="fas fa-tags me-2"></i>Sell Listings</h4>
            <div className="glass-panel p-4 border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Society Name</th>
                                <th scope="col">House No</th>
                                <th scope="col">Sell Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selllist.map((data, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold text-light">{data.member?.firstname || "N/A"}</td>
                                    <td>{data.member?.mobile || "N/A"}</td>
                                    <td className="text-secondary">{data.societyName}</td>
                                    <td><span className="badge bg-dark border border-secondary">{data.member?.houseno || "N/A"}</span></td>
                                    <td><span className="badge bg-success rounded-pill px-3 py-2">${data.Sellprice?.toLocaleString() || "N/A"}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Selllist