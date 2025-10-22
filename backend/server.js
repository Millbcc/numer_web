import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_DATABASE || "numerapi"
});

app.get("/api/bisection", (req, res) => {
  db.query("SELECT * FROM bisection_data", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

app.get("/api/linear_regression", (req, res) => {
  db.query("SELECT * FROM linear_data", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
