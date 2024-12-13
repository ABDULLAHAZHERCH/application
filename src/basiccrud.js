import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const CrudComponent = () => {
  const [data, setData] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: "", age: "" });
  const [editRecord, setEditRecord] = useState({ id: "", name: "", age: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/data");
      setData(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (e) => {
    e.preventDefault();
    if (!newRecord.name || !newRecord.age) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/data",
        newRecord
      );
      setData((prevData) => [...prevData, response.data]);
      setNewRecord({ name: "", age: "" });
      setError(null);
    } catch (err) {
      setError("Failed to add record");
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = async (e) => {
    e.preventDefault();
    if (!editRecord.name || !editRecord.age || !editRecord.id) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/data/${editRecord.id}`,
        editRecord
      );
      setData((prevData) =>
        prevData.map((item) =>
          item.id === response.data.id ? response.data : item
        )
      );
      setEditRecord({ id: "", name: "", age: "" });
      setError(null);
    } catch (err) {
      setError("Failed to update record");
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/data/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete record");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="crud-container">
      <h1 className="greeting">Basic CRUD</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="form-container">
        <form className="form" onSubmit={addRecord}>
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={newRecord.name}
            onChange={(e) =>
              setNewRecord({ ...newRecord, name: e.target.value })
            }
          />
          <input
            className="input"
            type="number"
            placeholder="Age"
            value={newRecord.age}
            onChange={(e) =>
              setNewRecord({ ...newRecord, age: e.target.value })
            }
          />
          <button className="button submit-button" type="submit">
            Add Record
          </button>
        </form>
      </div>
      {editRecord.id && (
        <div className="form-container">
          <form className="form" onSubmit={updateRecord}>
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={editRecord.name}
              onChange={(e) =>
                setEditRecord({ ...editRecord, name: e.target.value })
              }
            />
            <input
              className="input"
              type="number"
              placeholder="Age"
              value={editRecord.age}
              onChange={(e) =>
                setEditRecord({ ...editRecord, age: e.target.value })
              }
            />
            <button className="button submit-button" type="submit">
              Update Record
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>{record.age}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => deleteRecord(record.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    onClick={() => setEditRecord(record)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudComponent;
