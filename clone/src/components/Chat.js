import {
  AttachFile,
  InsertEmoticon,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from "@mui/icons-material/Mic";
import React, { useState } from "react";
import "./Chat.css";
import axios from "../axios"

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const date = new Date()
    var ampm = date.getHours >= 12 ? 'pm' : 'am';
    const time = date.getHours() + ':' + date.getMinutes() + ' ' + ampm

    await axios.post('/message/new',{
      message: input,
      name: "user",
      timestamp: time, 
      received: false,
    })
    setInput('')
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerinfo">
          <h3>Group name</h3>
          <p>last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.received ? "" : " chat__receiver" 
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="type something"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button onClick={sendMessage} type="submit">
            send
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
