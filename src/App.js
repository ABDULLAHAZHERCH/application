import React, { useState } from "react";
import "./App.css";

import { Greeting } from "./Greeting";
import { Counter } from "./Counter";
import Weather from "./Weather";
import CrudComponent from "./basiccrud";
import Mongocrud from "./mongocrud";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Greeting name="Abdullah Azher Chaudhary " />;
      case "counter":
        return <Counter />;
      case "weather":
        return <Weather />;
      case "crud1":
        return <CrudComponent />;
      case "crud2":
        return <Mongocrud />;
      default:
        return <Greeting name="A.A.C" />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={activeTab === "counter" ? "active" : ""}
            onClick={() => setActiveTab("counter")}
          >
            Counter
          </button>
          <button
            className={activeTab === "weather" ? "active" : ""}
            onClick={() => setActiveTab("weather")}
          >
            Weather
          </button>
          <button
            className={activeTab === "crud1" ? "active" : ""}
            onClick={() => setActiveTab("crud1")}
          >
            Crud
          </button>
          <button
            className={activeTab === "crud2" ? "active" : ""}
            onClick={() => setActiveTab("crud2")}
          >
            Ecommerce
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </header>
    </div>
  );
}

export default App;
