import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cars, setCars] = useState([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    const response = await axios.get('/api/cars');
    setCars(response.data);
  };

  const addCar = async () => {
    const newCar = { make, model, year };
    await axios.post('/api/cars', newCar);
    getCars();
  };

  const editCar = async (id) => {
    const updatedCar = { make, model, year };
    await axios.put(`/api/cars/${id}`, updatedCar);
    getCars();
  };

  const deleteCar = async (id) => {
    await axios.delete(`/api/cars/${id}`);
    getCars();
  };

  return (
    <div>
      <h1>Cars</h1>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>
                <button onClick={() => deleteCar(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Car</h2>
      <form onSubmit={(e) => { e.preventDefault(); addCar(); }}>
        <label>Make:</label>
        <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
        <label>Model:</label>
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        <label>Year:</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;