const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory data storage for mini project
let prescriptions = [
  {
    id: 1,
    patientName: "John Doe",
    diagnosis: "Fever and Cold",
    medicine: "Paracetamol",
    dosage: "500mg after meal",
    date: new Date().toLocaleDateString()
  }
];

// GET: Fetch all prescriptions
app.get('/api/prescriptions', (request, response) => {
  response.json(prescriptions);
});

// POST: Add a new prescription
app.post('/api/prescriptions', (request, response) => {
  const { patientName, diagnosis, medicine, dosage } = request.body;
  
  const newRecord = {
    id: Date.now(),
    patientName,
    diagnosis,
    medicine,
    dosage,
    date: new Date().toLocaleDateString()
  };

  prescriptions.push(newRecord);
  response.status(201).json({ message: "Prescription created successfully", data: newRecord });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});