import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:5000/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (res.ok) {
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setText("");
    }
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`${API_BASE}/todos/${id}/toggle`, { method: "PUT" });
    if (res.ok) {
      const updated = await res.json();
      setTodos(todos.map(t => t.id === updated.id ? updated : t));
    }
  };

  const deleteTodo = async (id) => {
    const res = await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
    if (res.status === 204) setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add new task"
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <div>
              <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.done ? "done" : ""}>
              {todo.text}
              </span>
            </div>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
         </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
