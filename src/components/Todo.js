import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import './styles/Todo.css'

function Todo(props) {
  return (

    <div className='todo'>
    <List>
        <ListItem>
        <ListItemAvatar>🔥</ListItemAvatar>
        <ListItemText primary={props.text} secondary="Category: TBD"/>
        </ListItem>
    </List>

    </div>
  )
}

export default Todo

// {props.text}