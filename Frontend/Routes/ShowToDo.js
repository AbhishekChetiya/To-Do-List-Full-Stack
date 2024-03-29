import UserModel from "../Model/UserModel.js"
import { jsonGenrate } from "../Validation/jsonGenrate.js"

export const GetTodos = async (req,res) =>{
    // console.log(req.userId);
    try{ 
        const list = await UserModel.findById(req.userId)
        .select("-password")
        .populate('todos')
        .exec();
        return res.json(jsonGenrate(200,"All Todos",list.todos));
    }
    catch (error){
    
      return res.json(jsonGenrate(202,"Error",error));
    }
}