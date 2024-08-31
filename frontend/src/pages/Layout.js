import React, { useState, useEffect } from 'react'
import { useNavigate, Link, Outlet } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Layout = () => {

    const navigate = useNavigate();

    const [data, setdata] = useState({ username: "", password: "" });
    const [member, setmember] = useState({ email: "", password: "" })
    const [members, setmembers] = useState(false);

    const handlemember = (e) => {
        setmember({ ...member, [e.target.name]: e.target.value });
    }

    const handlechange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }


    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:7000/login/adminlogin", data);

            if (response.status === 201) {
                localStorage.setItem("Admin", response.data.token);
                toast.success(`🦄 ${response.data.message}!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                // window.alert(response.data.message);
                setdata({ username: "", password: "" });
                navigate("/adminworks");
            } else {
                // window.alert(response.data.error);
                toast.error(`🦄 ${response.data.error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            window.alert("Error occurs");
        }
    }

    const membersubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:7000/login/memberlogin", member);

            if (response.status === 200) {
                localStorage.setItem("Member", response.data.token);
                toast.success(`🦄 ${response.data.message}!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                // window.alert(response.data.message);
                setmember({ email: "", password: "" });
                setmembers(true);
                navigate("/memberworks");
            } else {
                // window.alert(response.data.error);
                toast.error(`🦄 ${response.data.error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } catch (error) {
            window.alert("error occurs");
            console.log("error occurs", error);
        }
    }


    const logout = () => {
        localStorage.removeItem("Member");
        setmembers(false);
        toast('🦄 Member logout successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        // alert("Member logout successfully");
        navigate("/");
    }


    useEffect(() => {
        const memberToken = localStorage.getItem("Member");
        const AdminToken = localStorage.getItem("Admin");
        if (memberToken) {
            setmembers(true);
            navigate("/memberworks");
        } else if (AdminToken) {
            navigate("/adminworks");
        } else {
            setmembers(false);
            navigate("/");
        }
    }, [])


    const navbar = () => {
        if (!members) {
            return (
                <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-navbar">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">HomeHarmony</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Search</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/homerentlist">Rent List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/homeselllist">Sell List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact Us</Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <button className="btn btn-outline-light mx-1 custom-btn" type="button" data-bs-toggle="modal" data-bs-target="#memberModal">Member</button>
                                <button className="btn btn-outline-light mx-1 custom-btn" type="button" data-bs-toggle="modal" data-bs-target="#adminModal">Admin</button>
                            </div>
                        </div>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-navbar" style={{ "padding": "15px" }}>
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">HomeHarmony
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/memberworks">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/memberaccount">My Account</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/membercomplain">Complain</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/memberrent">Rent List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/membersell">Sell List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/password">Password</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/message">Message</Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <button className="btn btn-outline-success" type="button" onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </nav>
            )
        }
    }



    return (

        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />

            {navbar()}


            <div className="row" style={{ paddingTop: "60px" }}>
                <Outlet />
            </div>


            <div className="modal fade" id="memberModal" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Member Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="w-75 m-auto py-4">
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlemember} />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={handlemember} />
                                </div>
                                <button type="submit" className="btn btn-outline-primary" onClick={membersubmit}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="adminModal" tabindex="-1" aria-labelledby="adminModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Admin Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='w-75 m-auto py-4'>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Username</label>
                                    <input type="text" name='username' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.username} onChange={handlechange} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" name='password' class="form-control" id="exampleInputPassword1" value={data.password} onChange={handlechange} />
                                </div>
                                <button type="submit" class="btn btn-outline-primary" onClick={submit}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
};


export default Layout;