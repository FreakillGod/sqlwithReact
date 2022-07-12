const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
//create

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES($1) RETURNING *",
      [description]
    );

    console.log(req.body);

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//all

app.get("/todos", async (req, res) => {
  try {
    const alltodos = await pool.query("SELECT * FROM todos");

    res.status(200).json(alltodos.rows);
  } catch (error) {
    console.log("error", error);
  }
});

//one todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const singleTodo = await pool.query(
      "SELECT * FROM todos WHERE todo_id=$1",
      [id]
    );
    res.status(200).json(singleTodo.rows[0]);
  } catch (error) {
    console.log("error", error);
  }
});

//update

app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.status(200).json("todo updated");
  } catch (error) {
    console.log("error", error);
  }
});

//delete

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await pool.query("DELETE FROM todos WHERE todo_id=$1", [
      id,
    ]);
    res.status(200).json(deletedTodo);
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(5000, () => console.log("server is running on port 5000..."));
