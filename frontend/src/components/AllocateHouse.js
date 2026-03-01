import React, { useState, useEffect } from 'react'
import axios from 'axios';

const AllocateHouse = () => {

  const [data, setdata] = useState({
    firstname: "", lastname: "", email: "", mobile: "", DOB: "", totalmembers: "", society: "", houseno: "", username: "", password: ""
  });

  const [first, setfirst] = useState([]);

  const [photo, setPhoto] = useState(null);


  const handlechange = (e) => {
    if (e.target.name === 'photo') {
      setPhoto(e.target.files[0]); // Handle file input
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };


  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.post("https://society-management-application.onrender.com/member/addmember", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        window.alert(response.data.message);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert("Error occurs");
    }
  };


  const getdata = async () => {
    try {
      const response = await axios.get("https://society-management-application.onrender.com/society/allsociety");

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

  useEffect(() => {
    getdata();
  }, [])


  return (
    <div className="glass-panel p-4 fade-in">
      <h4 className="text-gradient fw-bold mb-4"><i className="fas fa-user-plus me-2"></i>Allocate House / Add Member</h4>
      <form onSubmit={submit}>
        <div className="row g-3">
          <div className="col-md-6 mb-3">
            <label className="form-label text-secondary">First Name</label>
            <input type="text" name="firstname" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label text-secondary">Last Name</label>
            <input type="text" name="lastname" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label text-secondary">Email</label>
            <input type="email" name="email" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label text-secondary">Mobile</label>
            <input type="number" name="mobile" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label text-secondary">Date of Birth</label>
            <input type="date" name="DOB" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label text-secondary">Total Members</label>
            <input type="number" name="totalmembers" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label text-secondary">Society</label>
            <select className="form-select bg-dark text-light border-secondary" id="exampleInputCountry" onChange={handlechange} name='society'>
              <option value="" disabled selected>Select society</option>
              {first.map((society) => (
                <option key={society.id} value={society.name}>{society.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label text-secondary">House No</label>
            <input type="number" name="houseno" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label text-secondary">Photo</label>
            <input type="file" name="photo" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-6 mb-4">
            <label className="form-label text-secondary">Username</label>
            <input type="text" name="username" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
          <div className="col-md-6 mb-4">
            <label className="form-label text-secondary">Password</label>
            <input type="password" name="password" className="form-control bg-dark text-light border-secondary" onChange={handlechange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4 mt-2">
          <i className="fas fa-save me-2"></i>Allocate House
        </button>
      </form>
    </div >

  );
};

export default AllocateHouse