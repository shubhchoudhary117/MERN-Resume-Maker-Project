import UserModel from "../../models/Authmodels/AutheticationModel.js"
import jwt from "jsonwebtoken"

class AuthControllers {

    static loginResponse = {
        loginSuccess: false,
        emailNotExist: false,
        passwordInvalid: false,
        token:""
    }

    static SignupUser = async (req, res) => {
        var userModel = new UserModel();
        //    check the email is already exist or not
        let inputEmail = req.body.email;
        var existuser = await userModel.collection.findOne({ Email: inputEmail });
        if (existuser) {
            return res.json({ "signupSuccess": false, "emailAlreadyExist": true })
        } else {
            userModel.Name = req.body.name;
            userModel.Email = req.body.email;
            userModel.Password = req.body.password;
            userModel.save();
            //    after successfull added then send response
            res.json({ "signupSuccess": true, "emailAlreadyExist": false })
        }
    }
    // end of signup user

    static LoginUser = async (req, res) => {
        var userModel = new UserModel();
        console.log(req.body.password)
        //    check the email is already exist or not
        let inputEmail = req.body.email;
        let inputPassword=req.body.password;
        var existuser = await userModel.collection.findOne({ Email: inputEmail });
  
        // check user details and set response object
        if (existuser) {
            this.loginResponse.emailNotExist = false;
            console.log(existuser)
            if (inputPassword==existuser.Password) {
                // set the response object
                this.loginResponse.emailNotExist=false;
                this.loginResponse.passwordInvalid=false;
                this.loginResponse.loginSuccess=true;
                // after login successfull generate the token
                let token=jwt.sign({"user":existuser.Email},"shubhakky2517", { expiresIn: '30d'});
                this.loginResponse.token=token
            } else {
                this.loginResponse.emailNotExist = false;
                this.loginResponse.passwordInvalid = true;
                this.loginResponse.loginSuccess = false;
                this.loginResponse.token=null
            }
        } else {
            this.loginResponse.emailNotExist = true;
            this.loginResponse.passwordInvalid = false;
            this.loginResponse.loginSuccess = false;
            this.loginResponse.token=null
        }
        // return the response
        return res.send(this.loginResponse)
    }
};

export default AuthControllers;