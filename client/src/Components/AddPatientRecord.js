import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const AddPatientRecord = ({ setPageDisplayPatientRecord }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let patientData = {
      id: uuidv4(),
      fname: document.getElementById("first-name").value,
      lname: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      age: document.getElementById("age").value,
      contact: document.getElementById("contact").value,
      reason: document.getElementById("reason").value,
    };

    axios
      .post("http://localhost:3001/addPatientRecord", patientData)
      .then((res) => {
        console.log(res.data);
        e.target.reset();
        window.alert("Successfully added to database");
        setPageDisplayPatientRecord();
      })
      .catch((err) => {
        console.log(err.response);
      });
    console.log(patientData);
  };

  return (
    <div className="container mt-3 mb-5">
      <div className="text-center border-dark border-top border-bottom">
        <h1>Add Patient Record</h1>
      </div>
      <div className="mt-4">
        <em>
          <u>
            <span
              onClick={(e) => {
                e.preventDefault();
                setPageDisplayPatientRecord();
              }}
            >
              Go Back
            </span>
          </u>
        </em>
      </div>
      {/* Form Submission  */}
      <form className="row g-3 mt-2 mb-2" onSubmit={handleFormSubmit}>
        {/* First Name input tag  */}
        <div className="col-6">
          <label htmlFor="inputFirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first-name"
            required
          />
        </div>
        {/* Last Name input tag  */}
        <div className="col-6">
          <label htmlFor="inputLastName" className="form-label">
            Last Name
          </label>
          <input type="text" className="form-control" id="last-name" required />
        </div>

        {/* Email Address input tag */}
        <div className="col-md-4">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" required />
        </div>

        {/* Age input tag */}
        <div className="col-md-4">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input type="number" className="form-control" id="age" required />
        </div>

        {/* Contact Number input tag*/}
        <div className="col-md-4">
          <label htmlFor="contact" className="form-label">
            Contact Number
          </label>
          <input
            type="number"
            className="form-control"
            id="contact"
            max="9999999999"
            min="1000000000"
            required
          />
        </div>

        {/* Allegry Reaction Type */}
        <div className="col-md-12">
          <label htmlFor="reason" className="form-label">
            Reason
          </label>
          <select className="form-select" id="reason" required>
            <option value="Allergy">Allergy</option>
            <option value="Colds and Flu">Colds and Flu</option>
            <option value="Fracture">Fracture</option>
            <option value="Mononucleosis">Mononucleosis</option>
            <option value="Conjunctivitis">Conjunctivitis</option>
            <option value="Diarrhea">Diarrhea</option>
            <option value="Stomach Aches">Stomach Aches</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {/* Button container  */}
        <div className="col-12">
          {/* Submit button  */}
          <button type="submit" className="btn btn-primary me-2">
            Submit
          </button>

          {/* Reset button  */}
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
