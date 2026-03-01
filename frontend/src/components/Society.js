import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Society = () => {

  const [data, setdata] = useState({
    name: "", houses: "", address: "", city: "", pincode: ""
  })

  const [first, setfirst] = useState([]);

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://society-management-application.onrender.com/society/addsociety", data);

      if (response.status === 201) {
        window.alert(response.data.message);
        getdata();
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error in:', error);
      window.alert("Error occurs");
    }
  }

  const getdata = async () => {
    try {
      const response = await axios.get("https://society-management-application.onrender.com/society/allsociety");

      if (response.status === 200) {
        setfirst(response.data.data);
        console.log(response.data.data);
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching society data in:', error);
      window.alert("Error occurs");
    }
  }

  const deletedata = async (id) => {

    try {
      const response = await axios.delete(`https://society-management-application.onrender.com/society/deletesociety/${id}`);

      if (response.status === 200) {
        window.alert(response.data.message);
        getdata();
      } else {
        window.alert(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting society data in:', error);
      window.alert("Error occurs");
    }
  }

  useEffect(() => {
    getdata();
  }, [])


  return (

    <>

      <div className="fade-in">
        <div className="glass-panel p-4 mb-5">
          <h4 className="text-gradient fw-bold mb-4"><i className="fas fa-building me-2"></i>Add New Society</h4>
          <form>
            <div className="row g-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="societyName" className="form-label text-secondary">Society Name</label>
                <input type="text" className="form-control bg-dark text-light border-secondary" id="societyName" name='name' placeholder="Enter society name" value={data.name} onChange={handlechange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="noOfHouses" className="form-label text-secondary">No Of Houses</label>
                <input type="number" className="form-control bg-dark text-light border-secondary" id="noOfHouses" name='houses' placeholder="e.g. 50" value={data.houses} onChange={handlechange} />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="address" className="form-label text-secondary">Address</label>
                <input type="text" className="form-control bg-dark text-light border-secondary" id="address" name='address' placeholder="Enter full address" value={data.address} onChange={handlechange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label text-secondary">City</label>
                <input type="text" className="form-control bg-dark text-light border-secondary" id="city" name='city' placeholder="City" value={data.city} onChange={handlechange} />
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="pincode" className="form-label text-secondary">Pincode</label>
                <input type="number" className="form-control bg-dark text-light border-secondary" id="pincode" name='pincode' placeholder="Pincode" value={data.pincode} onChange={handlechange} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4" onClick={submit}>
              <i className="fas fa-plus me-2"></i>Add Society
            </button>
          </form>
        </div>

        <div className="glass-panel p-4 delay-100">
          <h4 className="text-light fw-bold mb-4"><i className="fas fa-list me-2"></i>Societies List</h4>
          <div className="table-responsive">
            <table className="table mt-2 align-middle">
              <thead>
                <tr>
                  <th scope="col">Action</th>
                  <th scope="col">Image</th>
                  <th scope="col">Society</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Pincode</th>
                  <th scope="col">Houses</th>
                </tr>
              </thead>
              <tbody>
                {
                  first.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <button className='btn btn-sm btn-outline-danger' onClick={() => deletedata(data._id)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>{data.image || '-'}</td>
                      <td className="fw-semibold text-light">{data.name}</td>
                      <td className="text-secondary">{data.address}</td>
                      <td>{data.city}</td>
                      <td>{data.pincode}</td>
                      <td><span className="badge bg-primary rounded-pill">{data.houses}</span></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>

  )
}

export default Society