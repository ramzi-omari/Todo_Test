import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebaseFile";

import firebase from "firebase";
import "./App.css";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [user, dispatch] = useStateValue();
  const [order, setOrder] = useState(true);

  const onChangeValue = (event) => {
    event.preventDefault();

    setOrder(!order);
  };

  // if (order) {
  //   var a = "asc";
  // } else {
  //   var a = "desc";
  // }
  // console.log(setInput);
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //setTodos([...todos,input])
    setInput("");
  };

  return (
    <div className="app">
      {!user ? (
        <Login></Login>
      ) : (
        <>
          <form>
            <button onChangeValue>Order Asc/Desc</button>
            <FormControl>
              <InputLabel>Write a Todo</InputLabel>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
              ></Input>
            </FormControl>
            <Button
              disabled={!input}
              type="submit"
              variant="contained"
              color="primary"
              onClick={addTodo}
            >
              Add todo
            </Button>
          </form>
          <ul>
            {/* todos is an object of id,todo note */}
            {todos.map((todo) => (
              <Todo todo={todo}></Todo>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
