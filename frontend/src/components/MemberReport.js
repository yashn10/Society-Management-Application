import React, { useState, useEffect } from 'react'
import axios from 'axios';

const MemberReport = () => {

  const [first, setfirst] = useState([]);
  const [data, setdata] = useState("");
  const [members, setmembers] = useState([]);
  const [table, settable] = useState();

  const handle = (e) => {
    setdata(e.target.value);
  }

  const getdata = async () => {
    try {
      const response = await axios.get(`https://society-management-application.onrender.com/society/allsociety`);

      if (response.status === 200) {
        setfirst(response.data.data);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching society data in:', error);
      window.alert("Error occurs");
    }
  }

  const view = async (e) => {
    e.preventDefault();

    if (!data) {
      window.alert("Please select a society");
      return;
    }

    try {
      const response = await axios.get(`https://society-management-application.onrender.com/member/getmembersbysociety/${data}`);

      if (response.status === 200) {
        setmembers(response.data.members);
        settable(true);
      } else if (response.status === 404) {
        window.alert(response.data.message);
        settable(false);
      } else {
        window.alert("Unexpected response status: " + response.status);
        settable(false);
      }
    } catch (error) {
      window.alert("Members not found for selected society");
      console.log("error", error);
      settable(false);
    }

  }

  const deletedata = async (id) => {

    try {
      const response = await axios.delete(`https://society-management-application.onrender.com/member/member/${id}`);

      if (response.status === 200) {
        window.alert(response.data.message);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting member data in:', error);
      window.alert("Error occurs");
    }
  }


  const tables = () => {
    if (table) {
      <div className="glass-panel p-4 fade-in delay-100">
        <h5 className="text-light fw-bold mb-4"><i className="fas fa-users me-2"></i>Members List</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle mt-2">
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">House No</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {
                members.map((data) => (
                  <tr key={data._id}>
                    <td>
                      <button className='btn btn-sm btn-outline-danger' onClick={() => deletedata(data._id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                    <td>
                      {data.photo ? <img src={data.photo} alt="Member" className="rounded-circle" style={{ width: '40px', height: '40px', objectFit: 'cover' }} /> : <div className="bg-secondary rounded-circle d-inline-block" style={{ width: '40px', height: '40px' }}></div>}
                    </td>
                    <td className="fw-semibold text-light">{data.firstname} {data.lastname}</td>
                    <td className="text-secondary">{data.email}</td>
                    <td>{data.mobile}</td>
                    <td><span className="badge bg-dark border border-secondary">{data.houseno}</span></td>
                    <td><span className="badge bg-primary rounded-pill">{data.totalmembers}</span></td>
                  </tr>
                )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    }
  }


  useEffect(() => {
    getdata();
  }, [])


  return (

    <div className="fade-in">

      <div className="glass-panel p-4 mb-4">
        <h4 className="text-gradient fw-bold mb-4"><i className="fas fa-search me-2"></i>Filter Members</h4>
        <form className='row g-3 align-items-end'>
          <div className="col-md-8">
            <label className="form-label text-secondary">Select Society</label>
            <select className="form-select bg-dark text-light border-secondary" name='society' onChange={handle} value={data} id="exampleInputCountry">
              <option value="" disabled>Choose...</option>
              {first.map((society) => (
                <option key={society._id} value={society._id}>{society.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100" onClick={view}>
              <i className="fas fa-eye me-2"></i>View Members
            </button>
          </div>
        </form>
      </div>


      {tables()}

    </div>


  )
}

export default MemberReport