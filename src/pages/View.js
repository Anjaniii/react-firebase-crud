import React, { useState, useEffect } from "react";
import fireDb from 'firebase/compat/app';
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`Employess/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);

  console.log("user", user);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Employee Contact Detail</p>
        </div>
        <div className="container">
          
          <br />
          <strong>FirstName: </strong>
          <span>{user.FirstName}</span>
          <br />
          <br />
          <strong>LastName: </strong>
          <span>{user.LastName}</span>
          <br />
          <br />
          <strong>Address: </strong>
          <span>{user.Address}</span>
          <br />
          <br />
          <strong>PhoneNo: </strong>
          <span>{user.PhoneNo}</span>
          <br />
          <br />
          <strong>AadharNo: </strong>
          <span>{user.AadharNo}</span>
          <br />
          <br />
          <strong>PanNo: </strong>
          <span>{user.PanNo}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
