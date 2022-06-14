import React, { useState, useEffect } from "react";
import {db} from './firebase';
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import {collection, getDocs} from "firebase/firestore";


const Home = () => {
  const [employees, setEmployees] = useState({});
  const employeesCollectionRef = collection(db, "employees");
 

  useEffect(() => {
    const getEmployees = async () => {
    const data = await getDocs(employeesCollectionRef);
    setEmployees(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    } 
  
    getEmployees();
  },);

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you want to delete that Employee ?")
    ) {
      db.child(`Employees/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Employee Deleted Successfully");
        }
      });
    }
  };

  
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
      
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>EmpNo</th>
            <th style={{ textAlign: "center" }}>FirstName</th>
            <th style={{ textAlign: "center" }}>LastName</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>PhoneNo</th>
            <th style={{ textAlign: "center" }}>AadharNo</th>
            <th style={{ textAlign: "center" }}>PanNo</th>
          </tr>
        </thead>
        
          <tbody>
            {Object.keys(employees).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employees[id].EmpNo}</td>
                  <td>{employees[id].FirstName}</td>
                  <td>{employees[id].LastName}</td>
                  <td>{employees[id].Address}</td>
                  <td>{employees[id].PhoneNo}</td>
                  <td>{employees[id].AadharNo}</td>
                  <td>{employees[id].PanNo}</td>
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
          </table>
          </div>
        
        
  );
}; 

export default Home;
