import React, { useState } from 'react'
import axios from 'axios';

const House = () => {

    const [data, setdata] = useState({
        society: "", block: "", house: "", detail: ""
    })

    const handlechange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://society-management-application.onrender.com/house", data);

            if (response.status === 201) {
                window.alert(response.data.message);
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error('Error in:', error);
            window.alert("Error occurs");
        }

    }


    return (

        <div className="glass-panel p-4 fade-in">
            <h4 className="text-gradient fw-bold mb-4"><i className="fas fa-home me-2"></i>Add New House</h4>
            <form>
                <div className="mb-4">
                    <label htmlFor="society" className="form-label text-secondary">Society Name</label>
                    <input type="text" name='society' className="form-control bg-dark text-light border-secondary" id="society" placeholder="Enter society" onChange={handlechange} />
                </div>
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <label htmlFor="block" className="form-label text-secondary">Block NO</label>
                        <input type="text" name='block' className="form-control bg-dark text-light border-secondary" id="block" placeholder="e.g. A" onChange={handlechange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="house" className="form-label text-secondary">House Type</label>
                        <input type="text" name='house' className="form-control bg-dark text-light border-secondary" id="house" placeholder="e.g. 2BHK" onChange={handlechange} />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="detail" className="form-label text-secondary">Detail (Optional)</label>
                    <textarea name='detail' className="form-control bg-dark text-light border-secondary" id="detail" rows="3" placeholder="Additional details..." onChange={handlechange}></textarea>
                </div>

                <button type="submit" className="btn btn-primary px-4" onClick={submit}>
                    <i className="fas fa-plus me-2"></i>Add House
                </button>
            </form>
        </div>

    )
}

export default House