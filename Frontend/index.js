import mongoose from "mongoose"
import express from "express"
import { Route } from "./Routes/checker.js";
import { protect } from "./Routes/checker.js";
import AuthMiddle from "./Middleware/AuthMiddleware.js";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors())
const dburl = "mongodb+srv://ToDoList:ToDoList@todolist.qhgolkx.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList";

mongoose.connect(dburl)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a non-zero code
  });

app.use('/api/',Route);

app.use('/api/',AuthMiddle, protect);


