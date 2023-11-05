import jwt from "jsonwebtoken"
import AuthenticationModel from "../../models/Authmodels/AutheticationModel.js"
class AuthorizationController {

    static TokenVerify = (req, res) => {
        let token = req.body.token;

        if (token != null) {
            // verify the token
            jwt.verify(token, "shubhakky2517", async (error, decoded) => {
                if (decoded.user != null) {
                    let verifiedUser = await AuthenticationModel.collection.findOne({ Email: decoded.user });
                    if (verifiedUser.Email == decoded.user) {
                        return res.json({ "Authentication": true, "tokenInvalid": false, "Authorization": true })
                    }
                } else {
                    return res.json({ "Authentication": false, "tokenInvalid": false, "Authorization": false, "somethingwentwrong": true })
                }
            });
        }
        else {
            return res.json({ "Authentication": false, "tokenInvalid": true, "Authorization": false })
        }
  
    }
}

export default AuthorizationController;