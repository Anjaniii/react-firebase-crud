import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import fireDb from 'firebase/compat/app';
import "./Search.css";

const Search = () => {
  const [data, setData] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("name");
  console.log("search", search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    fireDb
      .child("Employees")
      .orderByChild("name")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  console.log("data", data);
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Link to="/">
          <button className="btn btn-edit">Go Back</button>
        </Link>
        {Object.keys(data).length === 0 ? (
          <h2>No Search Found with that Name : {query.get("name")}</h2>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
        
                <th style={{ textAlign: "center" }}>FirstName</th>
                <th style={{ textAlign: "center" }}>LastName</th>
                <th style={{ textAlign: "center" }}>Address</th>
                <th style={{ textAlign: "center" }}>PhoneNo</th>
                <th style={{ textAlign: "center" }}>AadharNo</th>
                <th style={{ textAlign: "center" }}>PanNo</th>
              </tr>
            </thead>
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


                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Search;
