// importing
import express from "express";
import mongoose from "mongoose";
import Message from "./dbmessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1572462",
  key: "9488047e3e4c71f192d8",
  secret: "d38cf79014f57b7a9c35",
  cluster: "ap2",
  useTLS: true,
});


// middleware

app.use(express.json());
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers","*");
//     next();
// })

app.use(cors())

// Db config

const connection_url =
  "mongodb+srv://harish20x12:milliannummM5$@cluster0.gtvzj6h.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established");
  } catch (e) {
    console.log(`An error occurred : ${e}`);
  }
};
connectDB();


// Pusher config
const db = mongoose.connection;

db.once("open", () => {
  console.log("Pusher Online");

  const msgCollection = db.collection("messages");

  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    // console.log("A change Occured", change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp : messageDetails.timestamp,
        received : messageDetails.received
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});


// api routes
app.get("/message", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/message/new", (req, res) => {
  const message = req.body;
  const newMessage = new Message(message);
  newMessage.save();
  res.status(201).json(newMessage);
});

app.delete("/message/delete/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.put("/message/update/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    message.received = !message.received;
    message.name = "updated";
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json(e);
  }
});

// listen
app.listen(port, () => {
  console.log(`Listening on LocalHost: ${port}`);
});
