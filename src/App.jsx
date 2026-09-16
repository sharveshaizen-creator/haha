import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    medicineName: '',
    dosage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Saving prescription:', formData);
  };

  return (
    <form className="prescription-form" onSubmit={handleSubmit}>
      <h2>New Digital Prescription</h2>

      <input
        type="text"
        name="patientId"
        placeholder="Patient ID"
        value={formData.patientId}
        onChange={handleChange}
      />

      <input
        type="text"
        name="diagnosis"
        placeholder="Diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
      />

      <input
        type="text"
        name="medicineName"
        placeholder="Medicine Name"
        value={formData.medicineName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="dosage"
        placeholder="Dosage (e.g., 500mg)"
        value={formData.dosage}
        onChange={handleChange}
      />

      <button type="submit">Save & Issue</button>
    </form>
  );
}
