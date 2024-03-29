import { validationResult } from "express-validator";
import { jsonGenrate } from "../Validation/jsonGenrate.js";
import Todo from "../Model/Todo.js";
import UserModel from "../Model/UserModel.js";

export const Todoj = async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json(jsonGenrate(204, "ToDo is Required", error));
    }
   
    try {
        const todo = await Todo.create({
            userId: req.userId,
            Todo: req.body.Todo,
        });
        
        if (todo) {
            const user = await UserModel.findOneAndUpdate(
                { _id: req.userId },
                { $push: { todos: todo } },
                { new: true }
            );
            if (user) { 
                return res.json(jsonGenrate(200, "Successfully Done", user));
            } else {
                return res.status(404).json(jsonGenrate(404, "User not found", "User with the given ID not found"));
            }
        } else {
            return res.status(500).json(jsonGenrate(500, "Internal Server Error", "Failed to create todo"));
        }
    } catch (error) {
        return res.status(500).json(jsonGenrate(500, "Internal Server Error", "An error occurred while processing the request"));
    }    
};