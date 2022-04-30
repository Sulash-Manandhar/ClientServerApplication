import React, { useState, useEffect } from "react";
import axios from "axios";

export const DisplayPatientRecord = ({ setPageAddPatientRecord }) => {
  //emply array usestate named data
  const [data, setData] = useState([]);

  //useEffect is used to get all the database data everytime when page loads
  useEffect(() => {
    axios
      .get("http://localhost:3001/getPatientsRecord")
      .then((res) => {
        setData(res.data.rows);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [data]);

  const handleDelete = (id) => {
    console.log("Id:", id);
    let response = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (response) {
      axios
        .delete(`http://localhost:3001/deletePatientRecord/${id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      window.alert("Failed");
    }
  };

  return (
    <div>
      <div className="d-flex mb-3 justify-content-between">
        <div>
          <span className="h2">Patients Records List</span>
        </div>
        <div>
          <button
            className="btn btn-success me-2"
            onClick={(e) => {
              e.preventDefault();
              setPageAddPatientRecord();
            }}
          >
            Add +
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Contact</th>
            <th scope="col">Reason</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {/* display the form data  */}
        <tbody id="tbody">
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.fname}</td>
              <td>{item.lname}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.contact}</td>

              <td>
                {item.reason === "Allergy" ? (
                  <font color="red">
                    <b>{item.reason}</b>
                  </font>
                ) : (
                  item.reason
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
