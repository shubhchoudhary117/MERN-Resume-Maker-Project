import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
const defaultObj = {
    email: "",
    password: "",
}
var myHeaders = new Headers({
    'Content-Type': 'application/json'
})
export const LoginView = () => {
    const navigate=useNavigate()
    const [emailFieldEmpty, setEmailFieldEmpty] = useState(false);
    const [passwordFieldEmpty, setPasswordFieldEmpty] = useState(false);
    const [allFieldIsEmpty, setAllFieldIsEmpty] = useState(false)
    const [formData, setFormData] = useState(defaultObj)

    const [emailNotExist,setEmailNotExist]=useState(false)
    const [passwordInvalid,setPasswordInvalid]=useState(false)
    // create object
    const createFormObject = (e) => {
        let key = e.target.id;
        let value = e.target.value;
        // set the formData
        setFormData({ ...formData, [key]: value })
    }

    const doRegister = () => {
        //   check each field
        if (formData.email != "" & formData.password != "") {
            // after everything is ok than register call the api
            let url = "http://localhost:9000/user/login";

            axios.post(url, formData, { headers: { myHeaders } })
                .then((response) => {
                    let LogerResponse = response.data;
                    console.log(LogerResponse)
                    //    check response and fire errros
                    if(LogerResponse.emailNotExist){
                        setEmailNotExist(true)
                        setPasswordInvalid(false)
                    }
                    if(LogerResponse.passwordInvalid){
                        setEmailNotExist(false)
                        setPasswordInvalid(true)
                    }

                    if(LogerResponse.loginSuccess){
                        // set the jwt token
                        localStorage.setItem("pixel_token",LogerResponse.token)
                        navigate("/pixelresume/mycv")
                        // clear the all fields
                        setFormData(defaultObj)
                    }

                    

                })

        }
        else {
            if (formData.email == "" & formData.password == "") {
                setAllFieldIsEmpty(true);
            } else {
                setAllFieldIsEmpty(false);
                if (formData.email == "") { setEmailFieldEmpty(true) } else { setEmailFieldEmpty(false) }
                if (formData.password == "") { setPasswordFieldEmpty(true) } else { setPasswordFieldEmpty(false) }

            }
        }
    }

    return <>


        <div className="background-section" >
            <header>
                <div className="logo"><img src={process.env.PUBLIC_URL + "/photos/logo.svg"} alt="" /></div>
            </header>
            <div className="user-registration-section">
                <div className="register-form">
                    <div className="heading">
                        <div className="title">Login your account</div>
                        <div className="text">And enjoy life during the time you saved!</div>
                    </div>
                    <div className="form-wrapper">
                        <div className="form-field">
                            <input type="text" id="email" onChange={createFormObject} placeholder="your email" />
                            {emailFieldEmpty ? <p className="validation-error">email is required</p> : ''}
                            {allFieldIsEmpty ? <p className="validation-error">email is required</p> : ''}
                            {emailNotExist ? <p className="validation-error">email is invalid</p> : ''}
                        </div>
                        <div className="form-field">
                            <input type="text" id="password" onChange={createFormObject} placeholder="your password" />
                            {passwordFieldEmpty ? <p className="validation-error">password is required</p> : ''}
                            {allFieldIsEmpty ? <p className="validation-error">password is required</p> : ''}
                            {passwordInvalid? <p className="validation-error">invalid password</p> : ''}
                        </div>

                        <div className="register-btn">
                            <button onClick={doRegister}>login an account</button>
                        </div>
                        <div className="message">
                            <p>if you don't have an account? <Link to="/pixelresume/signup" className="link">signup</Link></p>
                        </div>
                    </div>
                </div>
                {/* <div className="register-people-image">
                    <img src={process.env.PUBLIC_URL + "/photos/backpeopleimg.svg"} alt="" />
                </div> */}
            </div>
        </div>

    </>
}