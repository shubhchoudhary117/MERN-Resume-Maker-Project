import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CircleIcon from '@mui/icons-material/Circle';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';
import { Portal } from '@mui/material';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { ResumeTemplate } from './ResumeTemplate';
import { useRef } from 'react';
var arr;
const myHeaders = new Headers(
    {
        'Content-Type': 'application/json'
    }
)


const MyCv = () => {

    const [resumes, setResumes] = useState([]);
    const [userAuthenticate, setUserAuthenticate] = useState(false)
    const [somethingwentwrong, setSomeThingWentWrong] = useState(false);
    const navigate = useNavigate();
    const reference = useRef();
 
    const doAuthenticate = async () => {

        let url = "http://localhost:9000/resume/mycv/authenticate";
        let tokenDetails = {
            token: localStorage.getItem("pixel_token")
        }
        // send post request
        axios.post(url, tokenDetails, { headers: myHeaders })
            .then((response) => {
                let verifyDetails = response.data;
                console.log(response)
                //    check responses
                if (verifyDetails.Authentication) {
                    // navigate the user to login page
                    navigate("/pixelresume/mycv")
                } else {
                    navigate("/pixelresume/login")
                }

                // check something went wrong
                if (verifyDetails.somethingwentwrong) {
                    setSomeThingWentWrong(true)
                } else {
                    setSomeThingWentWrong(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getResume = async () => {
        // create an object
        let userToken = {
            token: localStorage.getItem("pixel_token")
        }
        // call the api and send data
        let url = "http://localhost:9000/resume/getresume";
        // call the service
        await axios.post(url, userToken, { headers: myHeaders })
            .then((response) => {
                let allResume = response.data.resumeData;

                setResumes(allResume);
                console.log(resumes)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    useEffect(() => {

        // calling the function
        getResume();
        // calling function for autheticate user
        doAuthenticate();

    }, []);





    return <>

        <div className="header">
            <div className="heading">your resume</div>
        </div>

        {/* call the template */}

        <div className="cv-templates">
            <div className="cv-container">
                <div className="cv-wrapper">


                    <div className="cv">
                        <div className="buttons">
                            <button><DownloadIcon className='icon' /></button>
                            <button><EditIcon className='icon' /></button>
                        </div>
                        <ResumeTemplate />
                    </div>






                </div>
            </div>
        </div>


    </>
}


export default MyCv;