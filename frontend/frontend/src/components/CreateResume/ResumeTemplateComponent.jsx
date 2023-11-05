import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CircleIcon from '@mui/icons-material/Circle';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';
import { Portal } from '@mui/material';

export const ResumeTemplate = (props) => {
    const [PersonalDetails,setPersonalDetails]=useState({})
    const [collageData,setCollageDate]=useState("");
    const [certificateDate,setCertificateDate]=useState("");
    const [CertificatesArray,setCertificatesArray]=useState(props.certificatesArray)
    const [skills,setSkills]=useState([]);
    var date=new Date(PersonalDetails.collageenddate);
    // set state data after every changes
    useEffect(()=>{
        console.log(props)
        setPersonalDetails(props.personalDetails)
        setCollageDate(date.toLocaleDateString("en-US"))
        setSkills(props.skills)
    })
    console.log(skills)
    return <>
        <div className="resume-template-section">
            <div className="template-wrapper">
                <div className="template-container">
                    <div className="template-border"></div>
                    <div className="personal-details">
                        <div className="header">
                            <h4 className="template-heading">personal details</h4>
                            <div className="header-divider"></div>
                        </div>
                        <div className="contact">
                            <ul>
                                <li className='email'><EmailIcon className='icon' /><div className="email-address">{PersonalDetails.email}</div></li>
                                <li ><CallIcon className='icon' /> +91{PersonalDetails.mobile}</li>
                                <li className='address'><HomeIcon className='icon' /><div className="address-name">{PersonalDetails.address}</div></li>
                            </ul>
                        </div>
                        <div className="technical-skills">
                            <div className="heading">technical skills</div>
                            <div className="divider"></div>
                            <div className="skills-list">
                                <ul>
                                    <li><p>fullstack developer</p></li>
                                    <li><p>ui/ux designer</p></li>
                                </ul>
                            </div>
                        </div>
                        <div className="other-skills">
                            <div className="heading">other skills</div>
                            <div className="divider"></div>
                            <div className="skills-list">
                                <ul>
                                    <li><p>communication</p></li>
                                    <li><p>open mic speaking</p></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="resume-content">
                        <div className="header">
                            <h2 className="heading">{PersonalDetails.firstname} {PersonalDetails.lastname}</h2>
                        </div>
                        <div className="profile-summary">
                            <div className="profile-heading"></div>
                            <div className="divider"></div>
                            <div className="summary-text">
                               {PersonalDetails.profilesummary}
                            </div>
                        </div>
                        <div className="internship-experience">
                            <div className="internship-experience-heading">internships</div>
                            <div className="divider"></div>
                            <div className="internship-list">
                                {/* internship --------------------------------- */}
                                <div className="internship-li">
                                    <div className="marker"><CircleIcon className='icon' /></div>
                                    <div className="internship-details">
                                        <div className="internship-detail">
                                            <div className="company-name">tip community</div>
                                            <div className="internship-description">we make a fullstack project</div>
                                        </div>
                                        <div className="internship-date">11/07/2019</div>
                                    </div>

                                </div>
                                {/* end of internships --------------------------- */}
                                {/* internship --------------------------------- */}
                                <div className="internship-li">
                                    <div className="marker"><CircleIcon className='icon' /></div>
                                    <div className="internship-details">
                                        <div className="internship-detail">
                                            <div className="company-name">tip community</div>
                                            <div className="internship-description">we make a fullstack project</div>
                                        </div>
                                        <div className="internship-date">11/07/2019</div>
                                    </div>

                                </div>
                                {/* end of internships --------------------------- */}
                            </div>
                        </div>
                        {/* end of internship section ---------------------------------------------- */}
                        {/* start the education section ------------------------------------------------ */}
                        <div className="education-section">
                            <div className="education-heading">education</div>
                            <div className="divider"></div>
                            <div className="education-wrapper">
                                <div className="education-details">
                                    <div className="course-name">{PersonalDetails.branch}</div>
                                    <div className="collage-name">{PersonalDetails.collagename}</div>
                                    <div className="cgpa">cgpa {PersonalDetails.cgpa}</div>
                                </div>
                                <div className="education-date">{collageData}</div>
                            </div>
                        </div>
                        {/* end the education section ------------------------------------------------ */}
                        <div className="certifications">
                            <div className="certificate-heading">certifications</div>
                            <div className="divider"></div>
                            <div className="certificate">
                                {
                                    CertificatesArray.map((c)=>{
                                        return(<h1>{c.certificatename}</h1>);
                                    })
                                }
                                <div className="certificate-wrapper">
                                    <div className="certificate-details">
                                        <div className="certificate-name">{PersonalDetails.certificatename}</div>
                                        <div className="certificate-description">{PersonalDetails.certificatedesc}</div>
                                    </div>
                                    <div className="certificate-date">{new Date(PersonalDetails.certificatedate).toLocaleDateString("en-US")}</div>
                                
                                </div>
                              
                            </div>
                        </div>
                        {/* end fo certifications details ----------------------- */}
                    </div>
                </div>
            </div>
        </div>
    </>
}