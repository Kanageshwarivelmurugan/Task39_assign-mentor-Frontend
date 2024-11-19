import React, { useState } from "react";
import { Button, Card, Form, Alert } from 'react-bootstrap';


function CreateStudent() {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/students/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: studentName, email: studentEmail }),
    });
    const result = await response.json();
    alert(result.message || "Student Created Successfully");
    setStudentName("");
    setStudentEmail("");
  };

  return (
    <div className="card my-4">
      <div className="card-header">
        <h5>Create Student</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="studentEmail"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
