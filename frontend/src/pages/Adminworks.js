import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Society from '../components/Society';
import House from '../components/House';
import HouseReport from '../components/HouseReport';
import AllocateHouse from '../components/AllocateHouse';
import MemberReport from '../components/MemberReport';
import ComplainList from '../components/ComplainList';
import Selllist from './Selllist';
import Rentlist from './Rentlist';

const Adminworks = () => {

    const navigate = useNavigate();

    const [data, setdata] = useState("")

    const components = (data) => {
        setdata(data);
    }

    useEffect(() => {
        components("addsociety");
    }, [])

    const logout = () => {
        localStorage.removeItem("Admin");
        alert("Admin logout successfully");
        navigate("/");
    }

    const renderComponent = () => {
        switch (data) {
            case "addsociety":
                return <Society />;
            case "addhouse":
                return <House />;
            case "housereport":
                return <HouseReport />;
            case "allocatehouse":
                return <AllocateHouse />;
            case "memberreport":
                return <MemberReport />;
            case "complain":
                return <ComplainList />;
            case "sellhouse":
                return <Selllist />;
            case "renthouse":
                return <Rentlist />;
            case "logout":
                return logout();
            default:
                return null;
        }
    }


    return (

        <div className='container-fluid px-4 py-5 fade-in'>
            <div className='row g-4'>

                <div className='col-lg-3 col-md-4'>
                    <div className="glass-panel p-4 sticky-top" style={{ top: '100px' }}>
                        <h5 className="text-gradient fw-bold mb-4"><i className="fas fa-user-shield me-2"></i>Admin Dashboard</h5>
                        <ul className="navbar-nav w-100">
                            <li className="nav-item">
                                <button className={`btn ${data === 'addsociety' ? 'btn-primary' : 'btn-outline-light'} mb-3 w-100 text-start`} onClick={() => components("addsociety")}>
                                    <i className="fas fa-building me-2"></i> Add Society
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn ${data === 'addhouse' ? 'btn-primary' : 'btn-outline-light'} mb-3 w-100 text-start`} onClick={() => components("addhouse")}>
                                    <i className="fas fa-home me-2"></i> Add House
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn ${data === 'housereport' ? 'btn-primary' : 'btn-outline-light'} mb-3 w-100 text-start`} onClick={() => components("housereport")}>
                                    <i className="fas fa-file-alt me-2"></i> House Report
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn ${data === 'allocatehouse' ? 'btn-primary' : 'btn-outline-light'} mb-3 w-100 text-start`} onClick={() => components("allocatehouse")}>
                                    <i className="fas fa-key me-2"></i> Allocate House
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn ${data === 'memberreport' ? 'btn-primary' : 'btn-outline-light'} mb-3 w-100 text-start`} onClick={() => components("memberreport")}>
                                    <i className="fas fa-users me-2"></i> Member Report
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn ${data === 'complain' ? 'btn-primary' : 'btn-outline-light'} mb-3 w-100 text-start`} onClick={() => components("complain")}>
                                    <i className="fas fa-exclamation-circle me-2"></i> Complain
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn ${data === 'sellhouse' ? 'btn-primary' : 'btn-outline-light'} mb-3 w-100 text-start`} onClick={() => components("sellhouse")}>
                                    <i className="fas fa-tag me-2"></i> Sell House Report
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn ${data === 'renthouse' ? 'btn-primary' : 'btn-outline-light'} mb-3 w-100 text-start`} onClick={() => components("renthouse")}>
                                    <i className="fas fa-sign me-2"></i> Rent House Report
                                </button>
                            </li>
                            <li>
                                <hr className="my-2 border-secondary" />
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-danger mt-2 w-100 text-start" onClick={() => components("logout")}>
                                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='col-lg-9 col-md-8'>
                    <div className="glass-panel p-4 h-100 min-vh-50 fade-in delay-100">
                        {renderComponent()}
                    </div>
                </div>

            </div>
        </div >

    )
}

export default Adminworks