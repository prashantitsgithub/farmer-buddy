import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [answers, setAnswers] = useState({}); // id -> answer
  const [pesticides, setPesticides] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [newPesticide, setNewPesticide] = useState({
    name: "",
    brand: "",
    size: "",
    form: "",
    target: "",
    content: "",
    dose: "",
    image: "",
  });
  const [editingPesticide, setEditingPesticide] = useState(null);

  const handleLogout = () => {
    // Clear any admin session data if needed
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    // Redirect to home page
    navigate("/");
    window.location.reload();
  };

  const fetchQueries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-queries");
      setQueries(res.data);
    } catch (err) {
      console.error("Failed to fetch queries:", err);
    }
  };

  const fetchPesticides = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-pesticides");
      setPesticides(res.data);
    } catch (err) {
      console.error("Failed to fetch pesticides:", err);
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-feedback");
      setFeedback(res.data);
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
    }
  };

  const handleAnswerChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handlePesticideChange = (e) => {
    setNewPesticide({ ...newPesticide, [e.target.name]: e.target.value });
  };

  const handleEditPesticideChange = (e) => {
    setEditingPesticide({
      ...editingPesticide,
      [e.target.name]: e.target.value,
    });
  };

  const submitAnswer = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/answer-query", {
        id,
        answer: answers[id],
      });
      alert(res.data.message);
      fetchQueries(); // refresh the list
    } catch (err) {
      alert("Error submitting answer");
      console.error(err);
    }
  };

  const addPesticide = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/add-pesticide",
        newPesticide
      );
      alert(res.data.message);
      setNewPesticide({
        name: "",
        brand: "",
        size: "",
        form: "",
        target: "",
        content: "",
        dose: "",
        image: "",
      });
      fetchPesticides();
    } catch (err) {
      alert("Error adding pesticide");
      console.error(err);
    }
  };

  const updatePesticide = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/update-pesticide/${editingPesticide.id}`,
        editingPesticide
      );
      alert(res.data.message);
      setEditingPesticide(null);
      fetchPesticides();
    } catch (err) {
      alert("Error updating pesticide");
      console.error(err);
    }
  };

  const deletePesticide = async (id) => {
    if (window.confirm("Are you sure you want to delete this pesticide?")) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/delete-pesticide/${id}`
        );
        alert(res.data.message);
        fetchPesticides();
      } catch (err) {
        alert("Error deleting pesticide");
        console.error(err);
      }
    }
  };

  const startEditing = (pesticide) => {
    setEditingPesticide(pesticide);
  };

  useEffect(() => {
    fetchQueries();
    fetchPesticides();
    fetchFeedback();
  }, []);

  return (
    <div className="admin-dashboard" style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>🛠 Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>Logout</span>
          <span>🚪</span>
        </button>
      </div>

      {/* Feedback Management Section */}
      <div style={{ marginBottom: "40px" }}>
        <h3>📝 Farmer Feedback</h3>
        {feedback.length === 0 ? (
          <p>No feedback received yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {feedback.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <span style={{ color: "#666" }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ margin: "5px 0", color: "#666" }}>{item.email}</p>
                <p
                  style={{
                    margin: "10px 0",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                  }}
                >
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pesticide Management Section */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Add New Pesticide</h3>
        <form onSubmit={addPesticide} style={{ maxWidth: "600px" }}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="name"
              placeholder="Pesticide Name"
              value={newPesticide.name}
              onChange={handlePesticideChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={newPesticide.brand}
              onChange={handlePesticideChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={newPesticide.size}
              onChange={handlePesticideChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="form"
              placeholder="Form (e.g., Liquid, Powder)"
              value={newPesticide.form}
              onChange={handlePesticideChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="target"
              placeholder="Target Pests/Diseases"
              value={newPesticide.target}
              onChange={handlePesticideChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="content"
              placeholder="Active Content"
              value={newPesticide.content}
              onChange={handlePesticideChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="dose"
              placeholder="Recommended Dose"
              value={newPesticide.dose}
              onChange={handlePesticideChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newPesticide.image}
              onChange={handlePesticideChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Pesticide
          </button>
        </form>
      </div>

      {/* Edit Pesticide Modal */}
      {editingPesticide && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h3>Edit Pesticide</h3>
            <form onSubmit={updatePesticide}>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Pesticide Name"
                  value={editingPesticide.name}
                  onChange={handleEditPesticideChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={editingPesticide.brand}
                  onChange={handleEditPesticideChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={editingPesticide.size}
                  onChange={handleEditPesticideChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="form"
                  placeholder="Form (e.g., Liquid, Powder)"
                  value={editingPesticide.form}
                  onChange={handleEditPesticideChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="target"
                  placeholder="Target Pests/Diseases"
                  value={editingPesticide.target}
                  onChange={handleEditPesticideChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="content"
                  placeholder="Active Content"
                  value={editingPesticide.content}
                  onChange={handleEditPesticideChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="dose"
                  placeholder="Recommended Dose"
                  value={editingPesticide.dose}
                  onChange={handleEditPesticideChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={editingPesticide.image}
                  onChange={handleEditPesticideChange}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Update Pesticide
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPesticide(null)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Existing Pesticides List */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Existing Pesticides</h3>
        {pesticides.length === 0 ? (
          <p>No pesticides added yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {pesticides.map((pesticide) => (
              <div
                key={pesticide.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={pesticide.image}
                  alt={pesticide.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <h4>{pesticide.name}</h4>
                <p>
                  <strong>Brand:</strong> {pesticide.brand}
                </p>
                <p>
                  <strong>Size:</strong> {pesticide.size}
                </p>
                <p>
                  <strong>Form:</strong> {pesticide.form}
                </p>
                <p>
                  <strong>Target:</strong> {pesticide.target}
                </p>
                <p>
                  <strong>Content:</strong> {pesticide.content}
                </p>
                <p>
                  <strong>Dose:</strong> {pesticide.dose}
                </p>
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  <button
                    onClick={() => startEditing(pesticide)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePesticide(pesticide.id)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Query Management Section */}
      <div>
        <h3>Query Management</h3>
        {queries.length === 0 ? (
          <p>No queries submitted yet.</p>
        ) : (
          queries.map((q) => (
            <div
              key={q.id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "15px",
                padding: "10px",
              }}
            >
              <p>
                <strong>Name:</strong> {q.name}
              </p>
              <p>
                <strong>Email:</strong> {q.email}
              </p>
              <p>
                <strong>Question:</strong> {q.question}
              </p>

              {q.answer ? (
                <p style={{ color: "green" }}>
                  <strong>Answer:</strong> {q.answer}
                </p>
              ) : (
                <div>
                  <textarea
                    rows="3"
                    cols="50"
                    placeholder="Type your answer..."
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                  <br />
                  <button onClick={() => submitAnswer(q.id)}>
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
