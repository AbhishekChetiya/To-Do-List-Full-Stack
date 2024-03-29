import { validationResult } from "express-validator";
import { jsonGenrate } from "../Validation/jsonGenrate.js";
import Todo from "../Model/Todo.js";
import UserModel from "../Model/UserModel.js";

export const deleted = async (req,res) => {

    const error = validationResult(req.body);
    if(!error.isEmpty()){
        return res.json(jsonGenrate(202,"User id is Required",error));
    }
    try{
       const result = await Todo.findOneAndDelete({
        userId:req.body.userId,
        _id:req.body.todo_id,
       })
       if(result){
        const user = UserModel.findOneAndUpdate({
            _id:req.userId,
        },{
            $pull:{todos:req.body.todo_id}
        })
        return res.json(jsonGenrate(200,"Sucessfully Deleted!!",null));
       }
    }
    catch(error){
        return res.json(jsonGenrate(202,"User id is Required",error));
    }
} 