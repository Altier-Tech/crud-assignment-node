const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create MySQL connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cars'
});

// Connect to MySQL
conn.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS cars (
id INT PRIMARY KEY AUTO_INCREMENT,
make VARCHAR(255) NOT NULL,
model VARCHAR(255) NOT NULL,
year INT NOT NULL
)`;

conn.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log(result);
});

// Add record
app.post('/api/cars', (req, res) => {
  const sql = 'INSERT INTO cars SET ?';
  const car = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year
  };
  conn.query(sql, car, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Car added...');
  });
});

// Edit record
app.put('/api/cars/:id', (req, res) => {
  const sql = `UPDATE cars SET make='${req.body.make}', model='${req.body.model}', year='${req.body.year}' WHERE id=${req.params.id}`;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Car updated...');
  });
});

// Delete record
app.delete('/api/cars/:id', (req, res) => {
  const sql = `DELETE FROM cars WHERE id=${req.params.id}`;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Car deleted...');
  });
});

// View records
app.get('/api/cars', (req, res) => {
  const sql = 'SELECT * FROM cars';
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Start server
app.listen('3000', () => {
  console.log('Server started on port 3000...');
});