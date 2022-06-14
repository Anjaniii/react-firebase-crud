import React, { useState, useEffect } from "react";
import fireDb from 'firebase/compat/app';
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";



const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fireDb.child("Employees").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you want to delete that Employee ?")
    ) {
      fireDb.child(`Employees/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Employee Deleted Successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child("Employees")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };
  const handleReset = () => {
    setSort(false);
    fireDb.child("Employees").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  };

  const filterData = (value) => {
    fireDb
      .child("Employees")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
      <h1> hi</h1>

        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>s.No</th>
            <th style={{ textAlign: "center" }}>FirstName</th>
            <th style={{ textAlign: "center" }}>LastName</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>PhoneNo</th>
            <th style={{ textAlign: "center" }}>AadharNo</th>
            <th style={{ textAlign: "center" }}>PanNo</th>
            {!sort && <th style={{ textAlign: "center" }}>Action</th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].FirstName}</td>
                  <td>{data[id].LastName}</td>
                  <td>{data[id].Address}</td>
                  <td>{data[id].PhoneNo}</td>
                  <td>{data[id].AadharNo}</td>
                  <td>{data[id].PanNo}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.FirstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.Address}</td>
                  <td>{item.PhoneNo}</td>
                  <td>{item.AadharNo}</td>
                  <td>{item.PanNo}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <label>Sort By:</label>
      <select className="dropdown" name="colValue" onChange={handleChange}>
        <option>Please Select</option>
        <option value="FirstName">FirstName</option>
        <option value="LastName">LastName</option>
        <option value="Address">Address</option>
        <option value="PhoneNo">PhoneNo</option>
        <option value="AadharNo">AadharNo</option>
        <option value="PanNo">PanNo</option>
      </select>
      <button className="btn btn-reset" onClick={handleReset}>
        Reset
      </button>
      <br />
      <label>Status:</label>
      <button className="btn btn-active" onClick={() => filterData("Active")}>
        Active
      </button>
      <button
        className="btn btn-inactive"
        onClick={() => filterData("Inactive")}
      >
        Inactive
      </button>
    </div>
  );
};

export default Home;
