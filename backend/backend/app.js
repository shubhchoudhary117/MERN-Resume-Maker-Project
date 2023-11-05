import express from "express"
import {DatabaseConnection} from "./Database/Connection.js"
import cors from "cors"
import AuthRoutes from "./routes/AuthenticationRoutes/AuthRoutes.js"
import ResumeRoutes from "./routes/ResumeRoutes/ResumeRouting.js"
import AuthorizationRoutes from "./routes/AuthenticationRoutes/AuthorizationRoutes.js"
import dotenv from "dotenv"
// get config vars
dotenv.config();
const app = express()
const port = 9000
// connect with mongodb database
DatabaseConnection();
// set the configurations
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// set the routes
app.use("/user",AuthRoutes)

app.use("/resume",ResumeRoutes)

app.use("/resume/mycv",AuthorizationRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})