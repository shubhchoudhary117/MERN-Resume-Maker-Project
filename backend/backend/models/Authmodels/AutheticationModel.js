
import mongoose, { Schema } from "mongoose"

var UserSchema=new mongoose.Schema(
    {
        Name:{type:String,lowercase:true},
        Email:{type:Schema.Types.Mixed,lowercase:true,unique:true},
        Password:{type:Schema.Types.Mixed}
    }
)

var UserModel=mongoose.model("UserAuthTable",UserSchema)

export default UserModel;