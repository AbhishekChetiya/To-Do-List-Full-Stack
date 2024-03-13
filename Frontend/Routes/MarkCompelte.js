import { validationResult } from "express-validator"
import { jsonGenrate } from "../Validation/jsonGenrate.js";
import Todo from "../Model/Todo.js";


export const  Marktodo = async (req,res) =>{
   const error = validationResult(req);
   if(!error.isEmpty()){
    return res.json(jsonGenrate(202,"To Do Id Required",error));
   }
   try{
        const todo = await Todo.findOneUpdate({
          _id:req.body.Todo_id,
          userId:req.userId,
        },[{
            $set:{
                isCompleted:{
                    $eq:[false,"$isCompeleted"]
                }
            }
        }])
        if(todo){
            return res.json(jsonGenrate(200,"Susscefully Mark Doen",todo));
        }
        
   }
   catch(error){
    return res.json(jsonGenrate(202,"To Do Id Required",error));
   }
}