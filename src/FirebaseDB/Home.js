import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, push, onValue, remove } from 'firebase/database';
import database from './Firebase';

const Home = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  const [getData, setGetData] = useState({});

  useEffect(() => {
    const registerRef = ref(database, 'register');
    const unsubscribe = onValue(registerRef, (snapshot) => {
      if (snapshot.exists()) {
        setGetData(snapshot.val());
      } else {
        setGetData({});
      }
      console.log('Snapshot:', snapshot.val());
    });

    return () => unsubscribe();
  }, []);

  const { firstname, lastname, email } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (firstname === '' || lastname === '' || email === '') {
      alert("Please fill in all fields");
      return;
    }
    const registerRef = ref(database, 'register');
    push(registerRef, data)
      .then(() => {
        alert("Data Saved Successfully");
        console.log(data);
        setData({ firstname: '', lastname: '', email: '' });
      })
      .catch(err => {
        console.error('Error saving data:', err);
      });
  };

  const deleteHander = key => {
    const registerRef = ref(database, `register/${key}`);
    remove(registerRef)
      .then(() => {
        console.log(`Data with key ${key} deleted successfully`);
        alert('Data deleted successfully');
      })
      .catch((err) => {
        console.error('Error deleting data:', err);
      });
  }

  return (
    <div className="container-fluid">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register Form:</h2>
      <form className="form-horizontal" style={{ border: '1px solid green', padding: '10px' }} onSubmit={submitHandler} autoComplete="off">
        <div className="form-group row mb-1">
          <label className="control-label col-sm-1">First Name:</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              name="firstname"
              value={firstname}
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
              value={lastname}
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
              value={email}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" className="btn btn-success" value="Submit" />
        </div>
      </form>

      <div className="mt-2">
        {/* Render fetched data from Firebase */}
        {getData && Object.keys(getData).length > 0 ? (
          Object.keys(getData).map(key => {
            return (
              <div key={key} className="border mb-1 p-2">
                <p>FirstName: {getData[key].firstname}</p>
                <p>LastName: {getData[key].lastname}</p>
                <p>Email: {getData[key].email}</p>
                <button className="btn btn-success"
                  onClick={() => navigate(`/edit/${key}`)}
                >Update</button> &nbsp;
                <button className="btn btn-danger"
                  onClick={() => deleteHander(key)}
                >Delete</button>
              </div>
            );
          })
        ) : (
          <p>No records available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
