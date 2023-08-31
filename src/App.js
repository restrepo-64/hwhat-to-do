import React, { useEffect, useState } from "react";
import "./App.css";
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import Todo from "./components/Todo";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  // uses short term memory for array

  const [input, setInput] = useState("");

  //when the app loads, we need to listen to the db and fetch new todos as we add/remove them
  useEffect(() => {
    //this code fires when the app.js loads, initially
    db.collection('todos').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => doc.data().text
      ))
    })
  }, []); //dependencies make hook run more depending on the conditions here


  const addTodo = (event) => {
    //this will fire off when we click button
    event.preventDefault();

    setTodos([...todos, input]);
    setInput(""); //clears text field for ease of use
  };

  return (
    <div className="App">
      <h1>Hwhat To Do</h1>
      <form>
        <FormControl>
          <InputLabel>Write Task to Do ✅</InputLabel>
          <Input value={input}
          onChange={(event) => setInput(event.target.value)} />
        </FormControl>
        
        <Button disabled={!input} variant="contained" type="submit" onClick={addTodo}>
          Add To 'To Dos'
        </Button>
      </form>

    <h2>To Do List:</h2>
      <ul>
        {todos.map((todo) => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;

