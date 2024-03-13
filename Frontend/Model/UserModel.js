import mongoose from "mongoose";
import Todo from "./Todo.js";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        min: 5,
        max: 15,
        required: true,
    },
    password: {
        type: String,
        min: 4,
        max: 12,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Todo
    }],
    date: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model("UserModel", UserSchema);
