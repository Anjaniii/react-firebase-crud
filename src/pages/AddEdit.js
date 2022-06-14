import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from 'firebase/compat/app';
import { toast } from "react-toastify";

const initialState = {
  FirstName: "",
  LastName: "",
  Address:"",
  PhoneNo: "",
  AadharNo: "",
  PanNo: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { FirstName , LastName , Address , PhoneNo , AadharNo, PanNo } = state;

  const navigate = useNavigate();

  const { id } = useParams();

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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!FirstName || !LastName || !Address || !PhoneNo || !AadharNo || !PanNo) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child("Employees").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Employee Added Successfully");
          }
        });
      } else {
        fireDb.child(`Employees/${id}`).set(state, (err) => {
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
        <label htmlFor="name">FirstName</label>
        <input
          type="text"
          id="name"
          name="Firstname"
          placeHolder="Your Name..."
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
        <label htmlFor="PhoneNo">PhoneNo</label>
        <input
          type="number"
          id="PhoneNo"
          name="PhoneNo"
          placeHolder="Your PhoneNo. ..."
          value={{PhoneNo} || ""}
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
