import jwt from "jsonwebtoken"
import AutheticationModel from "../models/Authmodels/AutheticationModel.js"
const GetUserFromToken = (token) => {
    var tokenUser;
    jwt.verify(token, "shubhakky2517", async (error, decoded) => {
        // extract user from docoded data
        tokenUser = decoded.user;
    })

    return tokenUser;
}

export default GetUserFromToken