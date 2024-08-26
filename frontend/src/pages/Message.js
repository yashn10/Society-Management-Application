import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Message = () => {

    const [userId, setUserId] = useState(null);
    const [message, setmessage] = useState([]);


    const getId = () => {
        const token = localStorage.getItem('Member');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken._id;
            setUserId(userId);
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/message/message/${userId}`);

            if (response.status === 200) {
                const message = response.data.data;
                setmessage(message);
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching message:', error);
            window.alert("Error fetching message");
        }
    }

    const deletemessage = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:7000/message/message/${id}`);

            if (response.status === 201) {
                alert(response.data.message);
                getData();
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error('Error in deleting message:', error);
            window.alert("Error in deleting message");
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


    return (

        <div className="container my-5">
            <h2 className="text-center mb-5 display-6">Rent Listings</h2>
            <div className="table-responsive">

                <table className="table table-striped table-bordered table-hover text-center shadow-sm">
                    <thead className="table-success">
                        <tr>
                            <th scope="col">Action</th>
                            <th scope="col">From</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {message.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    <button className='btn btn-outline-danger' onClick={() => deletemessage(data._id)}>Delete</button>
                                </td>
                                <td>{data.name}</td>
                                <td>{data.subject}</td>
                                <td>{data.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>

    )
}

export default Message