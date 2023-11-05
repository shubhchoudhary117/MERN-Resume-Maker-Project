import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CircleIcon from '@mui/icons-material/Circle';
import HomeIcon from '@mui/icons-material/Home';


import { useEffect, useState } from 'react';
import { Portal } from '@mui/material';




export const ResumeTemplate=()=>{
    return <>
     {/* <ResumeTemplate personalDetails={{ ...PersonalDetails }} skills={skills} certificatesArray={CertificatesArr}/> */}

            <div className="cv-template">
                <div className="template-container">
                    <div className="template-border"></div>
                    <div className="personal-details">
                        <div className="header">
                            <h4 className="template-heading">personal details</h4>
                            <div className="header-divider"></div>
                        </div>
                        <div className="contact">
                            <ul>
                                <li className='email'><EmailIcon className='icon' /><div className="email-address"></div></li>
                                <li ><CallIcon className='icon' /> +91</li>
                                <li className='address'><HomeIcon className='icon' /><div className="address-name"></div></li>
                            </ul>
                        </div>
                        <div className="technical-skills">
                            <div className="heading">technical skills</div>
                            <div className="divider"></div>
                            <div className="skills-list">
                                <ul>
                                    {/* {
                        skills.map((skill) => {
                          return (<li>{skill}</li>);
                        })
                      } */}
                                </ul>
                            </div>
                        </div>
                        <div className="profiles">
                            <div className="heading">Profiles</div>
                            <div className="divider"></div>
                            <div className="profile-list">
                                <div className="profile">
                                    <div className="profile-heading">website link</div>
                                    <div className="profile-link"></div>
                                </div>
                                <div className="profile">
                                    <div className="profile-heading">github profile</div>
                                    <div className="profile-link"></div>
                                </div>
                                <div className="profile">
                                    <div className="profile-heading">Linkedin profile</div>
                                    <div className="profile-link"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="resume-content">
                        <div className="header">
                            <h2 className="heading"></h2>
                        </div>
                        <div className="profile-summary">
                            <div className="profile-heading"></div>
                            <div className="divider"></div>
                            <div className="summary-text">

                            </div>
                        </div>
                        <div className="internship-experience">
                            <div className="internship-experience-heading">internships</div>
                            <div className="divider"></div>
                            <div className="internship-list">
                                {/* {
                      InternshipsArr.map((i) => {
                        return (
                          <div className="internship-li">
                            <div className="marker"><CircleIcon className='icon' /></div>
                            <div className="internship-details">
                              <div className="internship-detail">
                                <div className="company-name">{i.companyname}</div>
                                <div className="internship-description">{i.internshipdesc}</div>
                              </div>
                              <div className="internship-date">
                                <div className="start">{new Date(i.startdate).toLocaleDateString("en-US")}</div>
                                -
                                <div className="end">{new Date(i.enddate).toLocaleDateString("en-US")}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    } */}


                            </div>
                        </div>
                        {/* end of internship section ---------------------------------------------- */}
                        {/* start the education section ------------------------------------------------ */}
                        <div className="education-section">
                            <div className="education-heading">education</div>
                            <div className="divider"></div>
                            <div className="education-wrapper">
                                <div className="education-details">
                                    <div className="course-name"></div>
                                    <div className="collage-name"></div>
                                    <div className="cgpa">cgpa </div>
                                </div>
                                <div className="education-date"></div>
                            </div>
                        </div>
                        {/* end the education section ------------------------------------------------ */}
                        <div className="certifications">
                            <div className="certificate-heading">certifications</div>
                            <div className="divider"></div>
                            <div className="certificate">
                                {/* {
                      CertificatesArr.map((c) => {
                        return (
                          <div className="certificate-wrapper">
                            <div className="certificate-details">
                              <div className="certificate-name">{c.certificatename}</div>
                              <div className="certificate-description">{c.certificatedesc}</div>
                            </div>
                            <div className="certificate-date">{new Date(c.certificatedate).toLocaleDateString("en-US")}</div>

                          </div>
                        );
                      })
                    } */}

                            </div>
                        </div>
                        {/* end fo certifications details ----------------------- */}
                    </div>
                </div>
            </div>
  

    
    
    </>
}