const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Database setup
const db = new sqlite3.Database("./tasks.db");
db.run("CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)");

// Routes
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => res.json(rows));
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  db.run("INSERT INTO tasks(title) VALUES(?)", [title], function() {
    res.json({ id: this.lastID, title });
  });
});

app.delete("/tasks/:id", (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", [req.params.id], () => res.sendStatus(200));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/tasks", (req, res) => { ... });
app.post("/tasks", (req, res) => { ... });
app.delete("/tasks/:id", (req, res) => { ... });