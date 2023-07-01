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
  
  // Create carmodels table if not exists
  const createTableQuery = `CREATE TABLE IF NOT EXISTS carmodels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INT NOT NULL
  )`;
  
  conn.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('carmodels table created...');
  });
});

// Add carmodel
app.post('/carmodels', (req, res) => {
  const { make, model, year } = req.body;
  const insertQuery = `INSERT INTO carmodels (make, model, year) VALUES (?, ?, ?)`;
  conn.query(insertQuery, [make, model, year], (err, result) => {
    if (err) throw err;
    console.log('carmodel added...');
    res.send('carmodel added...');
  });
});

// Delete carmodel
app.delete('/carmodels/:id', (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM carmodels WHERE id = ?`;
  conn.query(deleteQuery, [id], (err, result) => {
    if (err) throw err;
    console.log('carmodel deleted...');
    res.send('carmodel deleted...');
  });
});

// Get all carmodels
app.get('/carmodels', (req, res) => {
  const selectQuery = `SELECT * FROM carmodels`;
  conn.query(selectQuery, (err, result) => {
    if (err) throw err;
    console.log('carmodels retrieved...');
    res.send(result);
  });
});

// Update carmodel
app.put('/carmodels/:id', (req, res) => {
  const { id } = req.params;
  const { make, model, year } = req.body;
  const updateQuery = `UPDATE carmodels SET make = ?, model = ?, year = ? WHERE id = ?`;
  conn.query(updateQuery, [make, model, year, id], (err, result) => {
    if (err) throw err;
    console.log('carmodel updated...');
    res.send('carmodel updated...');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});