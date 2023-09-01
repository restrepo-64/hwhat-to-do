import React, { useEffect, useState } from "react";
import "./App.css";
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import Todo from "./components/Todo";
import { db } from "./firebase";
import firebase from "firebase/compat/app";


function App() {
  const [todos, setTodos] = useState([]);
  // uses short term memory for array

  const [input, setInput] = useState("");

  //when the app loads, we need to listen to the db and fetch new todos as we add/remove them
  useEffect(() => {
    //this code fires when the app.js loads, initially
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, text: doc.data().text})
      ))
    })
  }, []); //dependencies make hook run more depending on the conditions here


  const addTodo = (event) => {
    //this will fire off when we click button
    event.preventDefault();

    db.collection('todos').add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

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
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;

