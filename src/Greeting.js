import React from "react";
import "./Greeting.css";

export const Greeting = (props) => {
  return (
    <div className="greeting-container">
      <h1 className="greeting">Greetings, {props.name} mi amor!</h1>
      <div className="course-info">
        <h2 className="course-name">Course: Software Engineering</h2>
        <p className="course-objective">
          Objective: Full Stack Development
        </p>
      </div>
    </div>
  );
};
