import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./login";

function App() {
  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState(null);

  const getMessages = async () => {
    await axios.get("/message").then((response) => setMessages(response.data));
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    var pusher = new Pusher("9488047e3e4c71f192d8", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__container">
          <Sidebar />
          <Chat messages={messages} />
        </div>
      )}
    </div>
  );
}

export default App;
