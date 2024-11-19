import React, { useState } from "react";
import { Button, Card, Form, Alert } from 'react-bootstrap';


function CreateMentor() {
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/mentors/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: mentorName, email: mentorEmail }),
    });
    const result = await response.json();
    alert(result.message || "Mentor Created Successfully");
    setMentorName("");
    setMentorEmail("");
  };

  return (
    <div className="card my-4">
      <div className="card-header">
        <h5>Create Mentor</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="mentorName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="mentorName"
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mentorEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="mentorEmail"
              value={mentorEmail}
              onChange={(e) => setMentorEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Mentor
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateMentor;
