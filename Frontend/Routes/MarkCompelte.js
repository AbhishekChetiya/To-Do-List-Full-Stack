import { validationResult } from "express-validator"
import { jsonGenrate } from "../Validation/jsonGenrate.js";
import Todo from "../Model/Todo.js";


export const  Marktodo = async (req,res) =>{
   const error = validationResult(req.body);
   
   if(!error.isEmpty()){
    return res.json(jsonGenrate(202,"To Do Id Required",error));
   }
   try{
    
        const todo = await Todo.findOneAndUpdate({
            userId:req.body.userId,
            _id:req.body.todo_id,
        },[{
            $set: {
                isCompleted: { $not: "$isCompleted" }
            }
        },])
        
        if(todo){
            return res.json(jsonGenrate(200,"Susscefully Mark Doen",todo));
        }
        
   }
   catch(error){
    return res.json(jsonGenrate(202,"To Do Id Required",error));
   }
}