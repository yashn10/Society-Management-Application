import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Memberworks = () => {

    const [member, setmember] = useState(null);
    const [society, setsociety] = useState(null);
    const [userId, setUserId] = useState(null);
    const [rentedit, setrentedit] = useState(false);
    const [selledit, setselledit] = useState(false);
    const [rent, setrent] = useState({
        Rentprice: ""
    });
    const [sell, setsell] = useState({
        Sellprice: ""
    });


    const handlechange = (e) => {
        setrent({ ...rent, [e.target.name]: e.target.value });
    }

    const handlechangesell = (e) => {
        setsell({ ...sell, [e.target.name]: e.target.value });
    }

    const getId = () => {
        const token = localStorage.getItem('Member');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken._id;
            setUserId(userId);
            console.log("User ID:", userId);
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get(`https://society-management-application.onrender.com/member/member/${userId}`);

            if (response.status === 200) {
                setmember(response.data.member || null);
                if (response.data.member && response.data.member.society) {
                    getSociety(response.data.member.society);
                }
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching member data in:', error);
            window.alert("Error occurs");
        }
    }

    const getSociety = async (societyId) => {
        try {
            const response = await axios.get(`https://society-management-application.onrender.com/society/getsociety/${societyId}`);

            if (response.status === 200) {
                setsociety(response.data.data || null);
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching society in:', error);
            window.alert("Error fetching society");
        }
    }

    const Addrent = async (e) => {
        e.preventDefault();

        const data = {
            memberid: userId,
            Rentprice: rent.Rentprice
        };

        try {
            const response = await axios.post('https://society-management-application.onrender.com/rentlist/memberrent', data);

            if (response.status === 201) {
                alert(response.data.message);
                setrentedit(false);
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            alert("Error occurs");
        }
    }

    const Addsell = async (e) => {
        e.preventDefault();

        const data = {
            memberid: userId,
            Sellprice: sell.Sellprice
        };

        try {
            const response = await axios.post('https://society-management-application.onrender.com/selllist/membersell', data);

            if (response.status === 201) {
                alert(response.data.message);
                setselledit(false);
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            alert("Error occurs");
        }
    }

    useEffect(() => {
        getId();
    }, []);

    useEffect(() => {
        if (userId) {
            getData();
        }
    }, [userId]);


    const rentforms = () => {
        if (rentedit) {
            return (
                <form className="mt-4 p-4 glass-panel border-0 fade-in bg-dark bg-opacity-25 rounded-3">
                    <h5 className="text-light mb-3"><i className="fas fa-home me-2"></i>List Home for Rent</h5>
                    <div className="mb-4">
                        <label htmlFor="Rentprice" className="form-label text-secondary">Rent Price (per month)</label>
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border-secondary border-end-0">$</span>
                            <input type="number" className="form-control form-control-lg bg-dark text-light border-secondary border-start-0 ps-0" name='Rentprice' id="Rentprice" placeholder="e.g. 1500" onChange={handlechange} value={rent.Rentprice} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4" onClick={Addrent}>Submit Listing</button>
                </form>
            )
        }
    }

    const sellforms = () => {
        if (selledit) {
            return (
                <form className="mt-4 p-4 glass-panel border-0 fade-in bg-dark bg-opacity-25 rounded-3">
                    <h5 className="text-light mb-3"><i className="fas fa-tag me-2"></i>List Home for Sale</h5>
                    <div className="mb-4">
                        <label htmlFor="Sellprice" className="form-label text-secondary">Selling Price</label>
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border-secondary border-end-0">$</span>
                            <input type="number" className="form-control form-control-lg bg-dark text-light border-secondary border-start-0 ps-0" name='Sellprice' id="Sellprice" placeholder="e.g. 250000" onChange={handlechangesell} value={sell.Sellprice} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4" onClick={Addsell}>Submit Listing</button>
                </form>
            )
        }
    }


    return (

        <div className="container py-5 fade-in">
            <h2 className="text-center mb-5 display-5 fw-bold text-gradient">Member Portal Dashboard</h2>

            {member && society ? (
                <div className="row g-5 align-items-start mt-2">
                    <div className="col-md-4 text-center mb-4 delay-100 float-anim">
                        {member.photo ? (
                            <div className="glass-panel p-2 pb-0 mb-3 d-inline-block">
                                <img
                                    src={`http://localhost:7000/${member.photo}`}
                                    alt={`Photo of ${society.name}`}
                                    className="img-fluid rounded"
                                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                                />
                            </div>
                        ) : (
                            <div className="glass-panel bg-dark rounded d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                                <div className="text-center">
                                    <i className="fas fa-image fa-3x text-muted mb-3"></i>
                                    <p className="text-secondary">No Photo Available</p>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="col-md-8 delay-200 fade-in">
                        <div className="card glass-panel border-0">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="card-title fw-bold mb-3">
                                    Society: <span className="text-gradient">{society.name}</span>
                                </h3>
                                <h5 className="card-subtitle mb-5 text-light d-flex align-items-center">
                                    <i className="fas fa-door-closed text-secondary me-2"></i>
                                    House Number: <span className="ms-2 fw-bold bg-dark bg-opacity-50 px-3 py-1 rounded-pill">{member.houseno}</span>
                                </h5>

                                <ul className="nav nav-pills mb-4 border-bottom border-secondary pb-3 gap-2" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link rounded-pill ${rentedit ? 'active bg-primary text-white' : 'text-light bg-dark bg-opacity-50'}`} id="rent-tab" data-bs-toggle="tab" data-bs-target="#rent" type="button" role="tab" onClick={() => { setrentedit(true); setselledit(false); }}>
                                            <i className="fas fa-key me-2"></i>Rent Home
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={`nav-link rounded-pill ${selledit ? 'active bg-primary text-white' : 'text-light bg-dark bg-opacity-50'}`} id="sell-tab" data-bs-toggle="tab" data-bs-target="#sell" type="button" role="tab" onClick={() => { setselledit(true); setrentedit(false); }}>
                                            <i className="fas fa-tag me-2"></i>Sell Home
                                        </button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="myTabContent">
                                    <div className={`tab-pane fade ${rentedit ? 'show active' : ''}`} id="rent" role="tabpanel">
                                        {rentforms()}
                                    </div>
                                    <div className={`tab-pane fade ${selledit ? 'show active' : ''}`} id="sell" role="tabpanel">
                                        {sellforms()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-secondary">Loading member or society data...</p>
                </div>
            )}
        </div>

    )
}

export default Memberworks