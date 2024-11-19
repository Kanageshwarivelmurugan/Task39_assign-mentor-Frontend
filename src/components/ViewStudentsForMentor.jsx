import React, { useState, useEffect } from "react";
import { Button, Card, Form, Alert } from 'react-bootstrap';


function ViewStudentsForMentor() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [studentsAssigned, setStudentsAssigned] = useState([]);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    const response = await fetch("http://localhost:5000/api/mentors/all");
    const data = await response.json();
    setMentors(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/students/mentor/${selectedMentor}`
    );
    const data = await response.json();
    setStudentsAssigned(data);
  };

  return (
    <div className="card my-4">
      <div className="card-header">
        <h5>Students  for a Particular Mentor
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="mentorSelectView" className="form-label">
              Select Mentor
            </label>
            <select
              className="form-select"
              id="mentorSelectView"
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
            View Students
          </button>
        </form>

        {studentsAssigned.length > 0 && (
          <ul className="list-group mt-3">
            {studentsAssigned.map((student) => (
              <li key={student._id} className="list-group-item">
                {student.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ViewStudentsForMentor;
