import mongoose from "mongoose"

export const DatabaseConnection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/ResumeDatabase',{'useUnifiedTopology':true,'useNewUrlParser':true})
    .then(()=>{
        console.log("database connection successfully")
    })
    .catch(()=>{
        console.log("database connectin refused")
    })
}