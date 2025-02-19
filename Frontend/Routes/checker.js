

import express from "express"
import Login from "./Login.js"
import User from "./Register_route.js"
import { check } from "express-validator"
import { GetTodos } from "./ShowToDo.js"
import { Marktodo } from "./MarkCompelte.js"
import { deleted } from "./Deleted.js"
import { Todoj } from "./ToDo.js"

export const protect = express.Router();
export const Route = express.Router();

Route.post("/register",  User);
Route.post("/Login",  Login);


protect.post("/createtodo", [check("Todo", "ToDo Description is required").exists()],Todoj);
protect.post("/Deletedto", [check("todo_id", "ToDo id is required").exists()], deleted);
protect.post("/MarkTodo", [check("todo_id", "ToDo id is required").exists()], Marktodo);
protect.get("/GetTodo", GetTodos);

