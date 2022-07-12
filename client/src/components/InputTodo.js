// es-lint disable //
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import List from "./List";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, seteditId] = useState();
  const [loading, setloading] = useState(false);

  const inputref = useRef(null);

  const handleEditData = (editValue, description) => {
    console.log("is cAlled");
    seteditId(editValue);
    setIsEditing(true);
    setDescription(description);
  };

  const handleDelete = async (id) => {
    try {
      setloading(true);
      const header = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.delete(
        `http://localhost:5000/todos/${id}`,
        header
      );
      setloading(false);
      setDescription("");
      return console.log(data);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const handleSubmit = async (e) => {
    setloading(true);

    setDescription(inputref.current.value);
    console.log(description);

    e.preventDefault();
    if (isEditing) {
      try {
        const body = { description };
        const header = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.patch(
          `http://localhost:5000/todos/${editId}`,
          body,
          header
        );
        setIsEditing(false);
        setloading(false);
        setDescription("");
        return console.log(data);
      } catch (error) {
        console.log(error.message);
        setloading(false);
      }
    }

    if (description === " " || description === "" || description === null)
      return;
    try {
      const body = { description };
      const header = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "http://localhost:5000/todos",
        body,
        header
      );
      console.log(data);
      setloading(false);
      setDescription("");
    } catch (error) {
      console.log("error", error.message);
      setloading(false);
    }
  };

  return (
    <>
      <h2 className="text-center">Pern TODO </h2>
      <form className="container d-flex w-80">
        <input
          type="text"
          className="form-control"
          value={description}
          ref={inputref}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit} className="btn btn-primary">
          {isEditing ? "Edit" : "Add"}
        </button>
      </form>
      {!loading && (
        <List handleDelete={handleDelete} handleEditData={handleEditData} />
      )}
    </>
  );
};

export default InputTodo;
