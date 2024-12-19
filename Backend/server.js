const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Database error",err);
            return res.status(500).json("Database error");
        } else {
            return res.json(data);
        }
    });
});

app.listen(8081, () => {
    console.log("running on port 8081");
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql,[req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Database error");
        } if (data.length > 0){
            return res.json("Login Successfull")
        }else{
            return res.json("Wrong username or password")
        }


    });
});