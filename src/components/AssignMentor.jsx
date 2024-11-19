import React, { useState, useEffect } from "react";
import { Button, Card, Form, Alert } from 'react-bootstrap';


function AssignMentor() {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");

  useEffect(() => {
    // Fetch students and mentors when the component is mounted
    fetchStudents();
    fetchMentors();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch("http://localhost:5000/api/students/all");
    const data = await response.json();
    setStudents(data);
  };

  const fetchMentors = async () => {
    const response = await fetch("http://localhost:5000/api/mentors/all");
    const data = await response.json();
    setMentors(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/students/assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId: selectedStudent, mentorId: selectedMentor }),
    });
    const result = await response.json();
    alert(result.message || "Mentor Assigned Successfully");
  };

  return (
    <div className="card my-4">
      <div className="card-header">
        <h5>o Assign or Change Mentor for particular Student
        </h5>
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
          <div className="mb-3">
            <label htmlFor="mentorSelect" className="form-label">
              Select Mentor
            </label>
            <select
              className="form-select"
              id="mentorSelect"
              value={selectedMentor}
              onChange={(e) => setSelectedMentor(e.target.value)}
              required
            >
              <option value="">Select a Mentor</option>
              {mentors.map((mentor) => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Assign Mentor
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignMentor;
