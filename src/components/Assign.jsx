import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';


function Assign() {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch students and mentors on component mount
    fetchStudents();
    fetchMentors();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students/stuentwithoutmentor');
      const data = await response.json();
      setStudents(data);  // Only students without mentors
    } catch (error) {
      setMessage('Error fetching students');
    }
  };

  const fetchMentors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentors/all');
      const data = await response.json();
      setMentors(data);
    } catch (error) {
      setMessage('Error fetching mentors');
    }
  };

  const handleStudentSelection = (e) => {
    const { value, checked } = e.target;
    setSelectedStudents((prev) => 
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleAssignMentor = async (e) => {
    e.preventDefault();

    if (!selectedStudents.length || !selectedMentor) {
      setMessage('Please select at least one student and a mentor.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/students/assign-mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentIds: selectedStudents,
          mentorId: selectedMentor,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        // Re-fetch the students after assignment
        fetchStudents();
        setSelectedStudents([]); // Clear selected students
        setSelectedMentor(''); // Clear selected mentor
      } else {
        setMessage(result.message || 'Error assigning mentor');
      }
    } catch (error) {
      setMessage('Error assigning mentor');
    }
  };

  return (
    <div className="card my-4">
      <div className="card-header">
        <h5>Assign or Change Mentor for Students</h5>
      </div>
      <div className="card-body">
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleAssignMentor}>
          <div className="mb-3">
            <label htmlFor="studentSelect" className="form-label">
              Select Students
            </label>
            <div>
              {students.length === 0 ? (
                <p>No students available for assignment.</p>
              ) : (
                students.map((student) => (
                  <div key={student._id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`student-${student._id}`}
                      value={student._id}
                      onChange={handleStudentSelection}
                    />
                    <label className="form-check-label" htmlFor={`student-${student._id}`}>
                      {student.name}
                    </label>
                  </div>
                ))
              )}
            </div>
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

export default Assign;
