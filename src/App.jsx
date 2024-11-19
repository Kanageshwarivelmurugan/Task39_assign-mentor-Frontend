import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateMentor from "./components/CreateMentor";
import CreateStudent from "./components/CreateStudent";
import AssignMentor from "./components/AssignMentor";
import ViewStudentsForMentor from "./components/ViewStudentsForMentor";
import ViewAssignedMentor from "./components/ViewAssignedMentor";
import Assign from "./components/Assign";
//import Assign from "./components/ Assign ";

function App() {
  return (
    <div className="container my-5">
      <h1 className="text-center">Mentor-Student Assignment</h1>

      {/* Create Mentor Form */}
      <CreateMentor />

      {/* Create Student Form */}
      <CreateStudent />

      <Assign />

      {/* Assign Mentor Form */}
      <AssignMentor />

      {/* View Students for Mentor */}
      <ViewStudentsForMentor />
    
      <ViewAssignedMentor />

     
      </div>

      
  );
}

export default App;
