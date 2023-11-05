import { useState } from "react"
import { Link } from "react-router-dom"
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2"
import { useHistory } from 'react-router-dom';
import axios from "axios"
const defaultObj = {
    name: "",
    email: "",
    password: "",
    cpassword: ""
}
var myHeaders = new Headers({
    'Content-Type': 'application/json'
})

export const SignupView = () => {
    const navigate = useNavigate();
    const [nameFieldEmpty, setNameFieldEmpty] = useState(false);
    const [emailFieldEmpty, setEmailFieldEmpty] = useState(false);
    const [passwordFieldEmpty, setPasswordFieldEmpty] = useState(false);
    const [allFieldIsEmpty, setAllFieldIsEmpty] = useState(false)
    const [conformpasswordFieldEmpty, setConformPasswordFieldEmpty] = useState(false)
    const [formData, setFormData] = useState(defaultObj)

    // create object
    const createFormObject = (e) => {
        let key = e.target.id;
        let value = e.target.value;
        // set the formData
        setFormData({ ...formData, [key]: value })
    }

    const doRegister = async () => {
        //   check each field
        if (formData.name != "" && formData.email != "" & formData.password != "" && formData.cpassword != "") {
            if (formData.password.match(formData.cpassword)) {
                setConformPasswordFieldEmpty(false)
                // after everything is ok than register call the api
                let url = "http://localhost:9000/user/signup";
                // call api and send signup data
                axios.post(url, formData, { headers: { myHeaders } })
                    .then((response) => {
                        // get the response data and set into ResponseObj
                        var ResponseObj = response.data
                        //    check response and fire errros
                        if (ResponseObj.signupSuccess) {
                            // fire the success popup
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Signup successfully',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            // clear all fields
                            setFormData(defaultObj);
                            // redirec to login page
                            navigate("/pixelresume/login")
                            
                        }
                        // check the email is already exist or not
                        if (ResponseObj.emailAlreadyExist) {
                            // if the email is already exist then fire popup
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'email is already exis',
                                footer: '<h4>email is already exist pleas inter new email and continue</h4>'
                            })
                        }


                    })
                    .catch((err) => {
                        console.log(err)
                    })

            } else {
                setConformPasswordFieldEmpty(true)
            }
        }
        else {
            if (formData.name == "" && formData.email == "" & formData.password == "" && formData.cpassword == "") {
                setAllFieldIsEmpty(true);
            } else {
                setAllFieldIsEmpty(false);
                if (formData.name == "") { setNameFieldEmpty(true) } else { setNameFieldEmpty(false) }
                if (formData.email == "") { setEmailFieldEmpty(true) } else { setEmailFieldEmpty(false) }
                if (formData.password == "") { setPasswordFieldEmpty(true) } else { setPasswordFieldEmpty(false) }
                if (formData.cpassword == "") { setConformPasswordFieldEmpty(true) } else { setConformPasswordFieldEmpty(false) }
            }
        }
    }

    return <>


        <div className="background-section">
            <header>
                <div className="logo"><img src={process.env.PUBLIC_URL + "/photos/logo.svg"} alt="" /></div>
            </header>
            <div className="user-registration-section">
                <div className="register-form">
                    <div className="heading">
                        <div className="title">Create an account</div>
                        <div className="text">And enjoy life during the time you saved!</div>
                    </div>
                    <div className="form-wrapper">
                        <div className="form-field">
                            <input type="text" id="name" value={formData.name} onChange={createFormObject} placeholder="your name" />
                            {nameFieldEmpty ? <p className='validation-error'>name is required</p> : ""}
                            {allFieldIsEmpty ? <p className='validation-error'>name is required</p> : ""}
                        </div>
                        <div className="form-field">
                            <input type="text" id="email" value={formData.email} onChange={createFormObject} placeholder="your email" />
                            {emailFieldEmpty ? <p className="validation-error">email is required</p> : ''}
                            {allFieldIsEmpty ? <p className="validation-error">email is required</p> : ''}
                        </div>
                        <div className="form-field">
                            <input type="text" id="password" value={formData.password} onChange={createFormObject} placeholder="your password" />
                            {passwordFieldEmpty ? <p className="validation-error">password is required</p> : ''}
                            {allFieldIsEmpty ? <p className="validation-error">password is required</p> : ''}
                        </div>
                        <div className="form-field">
                            <input type="text" id="cpassword" value={formData.cpassword} onChange={createFormObject} placeholder="comform-password" />
                            {conformpasswordFieldEmpty ? <p className="validation-error">please conform password</p> : ''}
                            {allFieldIsEmpty ? <p className="validation-error">please conform password</p> : ''}
                        </div>
                        <div className="register-btn">
                            <button onClick={doRegister}>create an account</button>
                        </div>
                        <div className="message">
                            <p>if you already have an account? <Link to="/pixelresume/login" className="link">signin</Link></p>
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