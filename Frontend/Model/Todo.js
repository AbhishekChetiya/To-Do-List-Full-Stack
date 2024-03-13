import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"NewUser",
    required:true,
  },
  Todo:{
    type:String,
    required:true,
  },
  isCompleted:{
    type:Boolean,
    default:false,
    required:true,
  },
  Data:{
    type:Date,
    default:Date.now,
  }
})

export default  mongoose.model("ToDo",TodoSchema);