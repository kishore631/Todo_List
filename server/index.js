import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

/* ===============================
   SIMPLE IN-MEMORY TODO STORAGE
================================= */

let todos = [];
let idCounter = 1;

/* GET ALL TODOS */
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

/* ADD TODO */
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: idCounter++,
    text: req.body.text,
    done: false,
  };

  todos.push(newTodo);
  res.json(newTodo);
});

/* TOGGLE TODO */
app.put("/api/todos/:id/toggle", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ error: "Not found" });

  todo.done = !todo.done;
  res.json(todo);
});

/* DELETE TODO */
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.sendStatus(204);
});

/* ===============================
   SERVE REACT BUILD (FOR DEPLOY)
================================= */

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
