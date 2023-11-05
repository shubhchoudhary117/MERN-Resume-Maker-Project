import mongoose, { Schema } from "mongoose"

// create the schema
var ResumeDataSechema=new mongoose.Schema(
    {
        firstname:{type:String},
        lastname:{type:String},
        email:{type:String},
        address:{type:String},
        headline:{type:String},
        websitelink:{type:String},
        githublink:{type:String},
        linkedin:{type:String},
        collagename:{type:String},
        collageenddate:{type:String},
        cgpa:{type:String},
        branchname:{type:String},
        profiledescription:{type:String},
        mobile:{type:String},
        skills:{type:Schema.Types.Array},
        certificates:{type:Schema.Types.Array},
        internships:{type:Schema.Types.Array},
        UserEmail:{type:Schema.Types.Mixed}
    }
)

// create the model
var ResumeDataModel=mongoose.model("ResumeDataTable",ResumeDataSechema)

export default ResumeDataModel;