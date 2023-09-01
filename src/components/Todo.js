import {
  List,
  ListItem,
  Button,
  ListItemAvatar,
  ListItemText,
  Modal,
  FormControl,
  Input,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import "./styles/Todo.css";
import { db } from "../firebase";

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    //update the todo with the new input
    db.collection("todos").doc(props.todo.id).set(
      {
        text: input,
        
      },
      { merge: true }
    );
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="todo">
      <Modal
        className="todo__modal"
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              <FormControl>
                <InputLabel>Write Updated Task ✅</InputLabel>
                <Input
                placeholder={props.todo.text}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
              </FormControl>

              <Button
                disabled={!input}
                variant="contained"
                type="submit"
                onClick={updateTodo}
              >
                Add To 'To Dos'
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>

      <List>
        <ListItem>
          <ListItemAvatar>🔥</ListItemAvatar>
          <ListItemText primary={props.todo.text} secondary="Category: TBD" />
          
          <EditIcon onClick={(e) => setOpen(true)} className="todo__edit"/>
          <DeleteIcon
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
            className="todo__delete"
          />
        </ListItem>
      </List>
    </div>
  );
}

export default Todo;

// {props.text}
