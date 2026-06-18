import React, { useState } from "react";
import "./Test.css";

export default function Test() {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    setName((prev) => (prev ? "" : "Test"));
    console.log(name);
  };

  return (
    <div className="container">
      <p className="name-title">{name}</p>
      <button onClick={handleSubmit} className="name-btn">
        {name ? "hide" : "show"}
      </button>
    </div>
  );
}
