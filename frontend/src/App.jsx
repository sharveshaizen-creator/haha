import { useEffect, useState } from 'react';

export default function App() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    diagnosis: '',
    medicine: '',
    dosage: '',
  });

  const fetchPrescriptions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/prescriptions');
      const data = await res.json();
      setPrescriptions(data);
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ patientName: '', diagnosis: '', medicine: '', dosage: '' });
        fetchPrescriptions();
      }
    } catch (err) {
      console.error('Error saving prescription:', err);
    }
  };

  return (
    <div className="container">
      <h1>Digital Prescription & Health Record Portal</h1>

      <h2>Add New Prescription</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Medicine Name"
          value={formData.medicine}
          onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Dosage (e.g., 500mg twice daily)"
          value={formData.dosage}
          onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
          required
        />
        <button type="submit">Issue Prescription</button>
      </form>

      <hr />

      <h2>Issued Health Records</h2>
      {prescriptions.length === 0 ? (
        <p>No records found.</p>
      ) : (
        prescriptions.map((item) => (
          <div key={item.id} className="card">
            <h3>Patient: {item.patientName}</h3>
            <p><strong>Diagnosis:</strong> {item.diagnosis}</p>
            <p><strong>Medicine:</strong> {item.medicine} ({item.dosage})</p>
            <small>Date: {item.date}</small>
          </div>
        ))
      )}
    </div>
  );
}
