import { validationResult } from "express-validator";
import { jsonGenrate } from "../Validation/jsonGenrate.js";
import Todo from "../Model/Todo.js";
import UserModel from "../Model/UserModel.js";

export const  Todoj = async (req,res) =>{
   
    const error = validationResult(erq);
    if(!error.isEmpty()){
        return res.json(jsonGenrate(204,"ToDo is Requored",error));
    }

    try{
        const todo = await Todo.create({
            userId : req.userId,
            ToDo:req.body.ToDo,
          });
          if(todo){
            const user = await UserModel.findOneUpdate({_id:req.userId},{
                $push:{todos:todo}
            })
             return res.json(jsonGenrate(200,"Successfully Doen",user));
          }
    }
    catch(error){
          return res.json(jsonGenrate(202,"Something Went Wrong"))
    }
};