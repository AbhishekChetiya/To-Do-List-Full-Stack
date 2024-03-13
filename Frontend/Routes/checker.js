

import express from "express"
import Login from "./Login.js"
import User from "./Register_route.js"
import { LoginValidation } from "../Validation/LoginValidation.js"
import { UserValidation } from "../Validation/UserValidation.js"
import { Createtodo } from "./Createtodo.js"
import { check } from "express-validator"
import { GetTodos } from "./ShowToDo.js"
import { Marktodo } from "./MarkCompelte.js"
import { deleted } from "./Deleted.js"

export const protect = express.Router();
export const Route = express.Router();

Route.post("/register", UserValidation, User);
Route.post("/Login", LoginValidation, Login);


protect.post("/createtodo", [check("Todo", "ToDo Description is required").exists()], Createtodo);
protect.post("/Deletedto", [check("Todo", "ToDo Description is required").exists()], deleted);
protect.post("/MarkTodo", [check("ToDo_id", "ToDo id is required").exists()], Marktodo);
protect.post("/GetTodo", GetTodos);

