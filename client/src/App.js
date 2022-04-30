import React, { useState } from "react";
import { AddPatientRecord } from "./Components/AddPatientRecord";
import { DisplayPatientRecord } from "./Components/DisplayPatientRecord";

const App = () => {
  const [page, setPage] = useState("DisplayPatientRecord");

  const setPageAddPatientRecord = () => {
    setPage("AddPatientRecord");
  };

  const setPageDisplayPatientRecord = () => {
    setPage("DisplayPatientRecord");
  };

  return (
    <div className="mt-4 container">
      {page === "DisplayPatientRecord" ? (
        <DisplayPatientRecord
          setPageAddPatientRecord={setPageAddPatientRecord}
        />
      ) : null}
      {page === "AddPatientRecord" ? (
        <AddPatientRecord
          setPageDisplayPatientRecord={setPageDisplayPatientRecord}
        />
      ) : null}
    </div>
  );
};

export default App;
