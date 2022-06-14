import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import {db} from './firebase';
import {collection, getDocs} from "firebase/firestore";

import { toast } from "react-toastify";

const initialState = {
  EmpNo:"",
  FirstName: "",
  LastName: "",
  Address:"",
  PhoneNo: "",
  AadharNo: "",
  PanNo: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [employees, setEmployees] = useState({});
  const employeesCollectionRef = collection(db, "employees");

  const { EmpNo, FirstName , LastName , Address , PhoneNo , AadharNo, PanNo } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  

  useEffect(() => {
    const getEmployees = async () => {
    const data = await getDocs(employeesCollectionRef);
    setEmployees(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    } 
  
    getEmployees();
  },);



  useEffect(() => {
    if (id) {
      setState({ ...employees[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, employees]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EmpNo || !FirstName || !LastName || !Address || !PhoneNo || !AadharNo || !PanNo) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        db.child("Employees").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Employee Added Successfully");
          }
        });
      } else {
        db.child(`Employees/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Employee Updated Successfully");
          }
        });
      }

      setTimeout(() => navigate.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
      <label htmlFor="name">EmpNo</label>
      <input
        type="number"
        id="number"
        name="EmpNo"
        placeHolder="Your /EmpNo..."
        value={EmpNo || ""}
        onChange={handleInputChange}
      />
      <label htmlFor="name">FirstName</label>
      <input
        type="text"
        id="name"
        name="Firstname"
        placeHolder="Your FirstName..."
        value={FirstName || ""}
        onChange={handleInputChange}
      />
        <label htmlFor="name">LastName</label>
        <input
          type="text"
          id="name"
          name="LastName"
          placeHolder="Your LastName..."
          value={LastName || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="Address">Address</label>
        <input
          type="text"
          id="name"
          name="Address"
          placeHolder="Your Address. ..."
          value={Address || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="name">PhoneNo</label>
        <input
          type="number"
          id="number"
          name="PhoneNo"
          placeHolder="Your PhoneNo. ..."
          value={PhoneNo || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="name">AadharNo</label>
        <input
          type="number"
          id="number"
          name="AadharNo"
          placeHolder="Your AadharNo..."
          value={AadharNo || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="number">PanNo</label>
        <input
          type="number"
          id="number"
          name="PanNo"
          placeHolder="Your PanNo..."
          value={PanNo || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
