import React, { useState, useEffect } from "react";
import axios from "axios";

const List = ({ handleEditData, handleDelete }) => {
  const [todosList, setTodosList] = useState([]);
  const [loading, setloading] = useState(false);

  const getAllTodos = async () => {
    // const header = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get("http://localhost:5000/todos");
    setloading(true);
    setTodosList(data);
    setloading(false);
  };
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="text-center h6 container mt-2">
      {loading ? (
        <div className="h4" style={{ backgroundColor: "red" }}>loading</div>
      ) : (
        <div>
          {todosList.length > -1 ? (
            todosList.map((item, i) => {
              return (
                <div
                  key={i}
                  style={{backgroundColor:"#eee"}}
                  className="d-flex justify-content-center align-items-center border-bottom border-warning mb-1"
                >
                  <div className="w-100 py-2 ">
                    {item.description}
                    <span style={{ color: "red" }} className="h6">
                      &nbsp;{item.todo_id}
                    </span>
                  </div>
                  <button
                    className="btn btn-primary  mx-1 px-3 my-1"
                    onClick={() =>
                      handleEditData(item.todo_id, item.description)
                    }
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.todo_id)}
                    className="btn btn-danger  mx-1 px-2 my-1"
                  >
                    delete
                  </button>
                </div>
              );
            })
          ) : (
            <div className="h4">List is empty</div>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
