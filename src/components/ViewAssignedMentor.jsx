import React, { useState, useEffect } from "react";
import { Button, Card, Form, Alert } from 'react-bootstrap';


function ViewAssignedMentor() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [mentorDetails, setMentorDetails] = useState(null);

  useEffect(() => {
    // Fetch students when the component is mounted
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch("http://localhost:5000/api/students/all");
    const data = await response.json();
    setStudents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // const response = await fetch(`http://localhost:5000/api/students/${selectedStudent}/mentor`);
    const response = await fetch(`http://localhost:5000/api/students/previous-mentor/${selectedStudent}`);

    const data = await response.json();
    setMentorDetails(data);
  };

  return (
    <div className="card my-4">
      <div className="card-header">
        <h5>View Previously Assigned Mentor</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentSelect" className="form-label">
              Select Student
            </label>
            <select
              className="form-select"
              id="studentSelect"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
            >
              <option value="">Select a Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            View Mentor
          </button>
        </form>

        {mentorDetails && (
          <div className="mt-3">
            <h5>Mentor Details:</h5>
            <p>Name: {mentorDetails.name}</p>
            <p>Email: {mentorDetails.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAssignedMentor;
