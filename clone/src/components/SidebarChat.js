import { Avatar } from '@mui/material'
import React from 'react'
import './Sidebarchat.css'

const SidebarChat = ({addNewChat}) => {

  const addChat =() => {
    prompt("hello dudue")
  }

  return !addNewChat ? (
    <div className='sidebarchat'>
        <Avatar />
        <div className='sidebarchat__info'>
            <h2>Group name</h2>
            <p>This is the last message</p>
        </div>
    </div>
  ) 
  : (
    <div className='sidebarchat' onClick={addChat}>
      <p>Add New Chat</p>
    </div>
  )
}

export default SidebarChat