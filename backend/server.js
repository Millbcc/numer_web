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

app.get("/api/data",(req,res)=>{
    db.query("SELECT * FROM data_points",(err,item)=>{
        if(err) console.error(err);
        res.json(item)
    })
})

app.listen(3000,()=>console.log("server start"))
