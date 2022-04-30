PORT = 3001;
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();

//app use
app.use(cors()); //enables scripts running on a browser client to interact with resources from a different origin
app.use(express.json()); //allows to send json data
app.use(bodyParser.urlencoded({ extended: true })); //parses request and converts it into a format from which easily relevant information can be extracted

//sqlite3 - connecting dabase
const db = new sqlite3.Database(
  "./database/patients.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.log(err);
    }
    //if database is successfully connected
    console.log("Database is successfully connected...");
  }
);

//Creating table patients
//This code only runs one time as same table wuth same name cannot be created twice.
// db.run(
//   `Create table patients (id , fname, lname, email, age, contact, reason)`,
//   (err) => {
//     if (err) {
//       return console.log(err);
//     }
//   }
// );

//get all patients records
app.get("/getPatientsRecord", (req, res) => {
  //sql query to get all patients data.
  const sql = `Select * from patients`;
  db.all(sql, [], (err, rows) => {
    //if query execution is fail
    //server send json object with status 500.
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        err,
      });
    }
    //if the query execution is success
    //server send json object with status 200.
    res.status(200).json({
      success: true,
      rows,
    });
  });
});

//add a new patient to the database
app.post("/addPatientRecord", (req, res) => {
  //props sent from client
  const { id, fname, lname, email, age, contact, reason } = req.body;
  //sql query to insert into database
  const sql = `INSERT INTO patients (id, fname, lname, email, age, contact, reason) 
                VALUES (?,?,?,?,?,?,?)`;

  db.run(
    sql,
    [id, fname, lname, email, age, contact, reason],
    (err, result) => {
      //if query execution is fail
      //server send json object with status 500.
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          err,
        });
      }
      //if the query execution is success
      //server send json object with status 200.
      res.status(200).json({
        success: true,
        result,
      });
    }
  );
});

//delete a record
app.delete("/deletePatientRecord/:id", (req, res) => {
  const id = req.params.id;
  const sql = `Delete from patients where id = ?`;
  db.run(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        err,
      });
    }
    return res.status(200).json({
      success: true,
      result,
    });
  });
});

//default api gateway
app.get("/", (req, res) => {
  res.send("<h1>Hello Express</h1>");
});

//listening express at port 4600
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));

//closing database after every execution
// db.close((err) => {
//   if (err) return console.log(err);
//   console.log("Database closed...");
// });
