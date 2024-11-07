import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import database from './Firebase';

const Edit = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  useEffect(() => {
    const registerRef = ref(database, `register/${key}`);
    get(registerRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log('No data found');
        }
      })
      .catch((error) => {
        console.error('Error getting data:', error);
      });
  }, [key]);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const registerRef = ref(database, `register/${key}`);

    set(registerRef, data)
      .then(() => {
        alert('Data updated successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        alert('Failed to update data');
      });
  };

  return (
    <div className="container-fluid">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Form:</h2>
      <form className="form-horizontal" style={{ border: '1px solid green', padding: '10px' }} onSubmit={submitHandler} autoComplete="off">
        
        <div className="form-group row mb-1">
          <label className="control-label col-sm-1">First Name:</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              name="firstname"
              value={data.firstname}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="form-group row mb-1">
          <label className="control-label col-sm-1">Last Name:</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              name="lastname"
              value={data.lastname}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="form-group row mb-1">
          <label className="control-label col-sm-1">Email:</label>
          <div className="col-sm-4">
            <input
              type="email"
              className="form-control"
              placeholder="Example@gmail.com"
              name="email"
              value={data.email}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" className="btn btn-success" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default Edit;
