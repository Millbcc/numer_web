const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "123456",
    database: "numerapi"
})

db.connect(()=>{
    console.log("MySQL Connect");
})

app.get("/api/linear", (req, res) => {
  db.query("SELECT * FROM linear_regression", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});


app.get("/api/bisection", (req, res) => {
  db.query("SELECT * FROM bisection_method", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});


app.listen(3000,()=>console.log("server start"))
