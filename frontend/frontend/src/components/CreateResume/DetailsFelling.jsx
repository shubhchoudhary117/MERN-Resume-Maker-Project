import AddIcon from '@mui/icons-material/Add';
import PortraitIcon from '@mui/icons-material/Portrait';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ResumeTemplate } from './ResumeTemplateComponent'
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CircleIcon from '@mui/icons-material/Circle';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';
import jsPdf from "jspdf"
import html2canvas from "html2canvas"
import { Portal } from '@mui/material';
import { pdfFromReact } from "generate-pdf-from-react-html";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import axios from "axios"
import { create } from '@mui/material/styles/createTransitions';
const defaultObj = {
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  postcode: "",
  heading: "",
  mobile: "",
  city: "",
  githublink: "",
  birthdate: "",
  linkedinprofile: "",
  website: "",
  collagename: "",
  branch: "",
  collageenddate: "",
  cgpa: "",
  collagecity: "",
  certificatename: "",
  certificatedate: "",
  certificatedesc: "",
  profilesummary: ""

}
const defaultCertificateDetails = {
  certificatename: "",
  certificatedate: "",
  certificatedesc: "",
}
const defaultInternshipDetails = {
  companyname: "",
  startdate: "",
  enddate: "",
  internshipdesc: ""
}

const myHeaders = new Headers(
  {
    'Content-Type': 'application/json'
  }
)
export const ResumeGeneratingPage = () => {
  //create states for handle form
  const [userAuthenticate, setUserAuthenticate] = useState(false)
  const [somethingwentwrong, setSomeThingWentWrong] = useState(false);
  const navigate = useNavigate();
  const [PersonalDetails, setPersonalDetails] = useState(defaultObj)
  const [skills, setSkills] = useState([]);
  const [Skill, setSkill] = useState("");
  const [collageDate, setCollageDate] = useState("");
  const [CertificatesArr, setCertificatesArr] = useState([])
  const [InternshipsArr, setInternshipsArr] = useState([])
  const [certificateDetails, setCertificateDetails] = useState(defaultCertificateDetails)
  const [internshipDetails, setInternshipDetails] = useState(defaultInternshipDetails)
  var today = new Date(PersonalDetails.collageenddate);
  var date = new Date(PersonalDetails.collageenddate);

  //create object ------------------------------
  const createObj = (e) => {
    let key = e.target.id;
    let value = e.target.value;
    setPersonalDetails({ ...PersonalDetails, [key]: value })
    console.log(today.toLocaleDateString("en-US"))

  }

  const createCertificate = (e) => {
    let key = e.target.id;
    let value = e.target.value;
    setCertificateDetails({ ...certificateDetails, [key]: value })
  }

  // create internship details
  const createInternshipDetails = (e) => {
    let key = e.target.id;
    let value = e.target.value;
    setInternshipDetails({ ...internshipDetails, [key]: value })
  }

  // add certificate
  const addCertificate = (e) => {
    e.preventDefault = false
    setCertificatesArr([...CertificatesArr, certificateDetails]);
    // after adding certificate clear the certificate form
    setCertificateDetails(defaultCertificateDetails);
  }

  // clear all certificates
  const clearAllCertificate = () => {
    setCertificatesArr([]);
  }

  // add internship
  const addInternship = (e) => {
    e.preventDefault = false
    setInternshipsArr([...InternshipsArr, internshipDetails]);

    // after adding certificate clear the certificate form
    setInternshipDetails(defaultInternshipDetails)
  }

  // create skill function
  const CreateSkill = (e) => {
    setSkill(e.target.value)
  }
  // add skilla
  const AddSkilss = () => {
    setSkills([...skills, Skill]);
    // clear the skills fields
    setSkill("")
  }
  // clear all skill
  const clearAllSkill = () => {
    setSkills([])
  }
  console.log(PersonalDetails)

  // download the certificate
  const downloadResume = () => {
    let resume_template = document.getElementById("resume_template");
    // convert the html to canvas
    html2canvas(resume_template, {}).then((canvas) => {

      const pageWidth = 210;
      const pageHeight = 297;
      const height = canvas.height * pageWidth / canvas.width;
      const imageData = canvas.toDataURL("image/png")
      // generate pdf
      let pdf = new jsPdf("p", "mm", "a4")
      pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, height)
      // save the pad
      pdf.save("resume.pdf")
      console.log(imageData)
    })
  }

  // save the resume in database
  const saveResume = async () => {


    let Autheticateurl = "http://localhost:9000/resume/mycv/authenticate";
    let tokenDetails = {
      token: localStorage.getItem("pixel_token")
    }
    // send post request
    axios.post(Autheticateurl, tokenDetails, { headers: myHeaders })
      .then(async (authresponse) => {
        let verifyDetails = authresponse.data;
        console.log(authresponse)
        //    check responses
        if (verifyDetails.Authentication) {

          // if the user is authenticated ///////////////////////////////////////////////

          // create the resume data object
          var resumeData = {
            CommanDetails: {
              firstname: PersonalDetails.firstname,
              lastname: PersonalDetails.lastname,
              email: PersonalDetails.email,
              address: PersonalDetails.address,
              headline: PersonalDetails.heading,
              mobile: PersonalDetails.mobile,
              city: PersonalDetails.city,
              githublink: PersonalDetails.githublink,
              linkedinprofile: PersonalDetails.linkedinprofile,
              website: PersonalDetails.website,
              collagename: PersonalDetails.collagename,
              branch: PersonalDetails.branch,
              collageenddate: PersonalDetails.collageenddate,
              cgpa: PersonalDetails.cgpa,
              profiledesc: PersonalDetails.profiledesc,
              skills: skills,
              internships: InternshipsArr,
              certificates: CertificatesArr
            },
            token: localStorage.getItem("pixel_token")
          }
          // end of creating object
          // call the api and send data
          let url = "http://localhost:9000/resume/addresume";
          // call api and send signup data
          await axios.post(url, resumeData, { headers: { myHeaders } })
            .then((resumeresponse) => {
              let resumeResponse=resumeresponse.data;
              // if the resume added succesffully then fire popup
              if (resumeResponse.resumeAdded) {
                // fire the success popup
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Resume saved successfully',
                  showConfirmButton: false,
                  timer: 1500
                });
                // after then clear the resume form 
                setPersonalDetails(defaultObj)
              }
              if (resumeResponse.somethingWentWrong) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'something went wrong',
                  footer: '<h4>something went wrong please check details and authorization permissions</h4>'
                })
              } 
             

            })
            .catch((error) => {
              console.log(error)
            })
          // end of calling the pip
          // .........................................................
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

  // for personal details fields event section -----------------------------------
  const showPersonalDetailFields = () => {
    const detailFieldsSection = document.getElementById("details-fields");
    const closeIcon = document.getElementById("close-icon")
    const operIcon = document.getElementById("open-icon")
    // show close button 
    operIcon.style.display = "none";
    closeIcon.style.display = "block";
    // show details
    detailFieldsSection.style.height = "100%";
  }
  const hidePersonalDetailFields = () => {
    const detailFieldsSection = document.getElementById("details-fields");
    const closeIcon = document.getElementById("close-icon")
    const operIcon = document.getElementById("open-icon")
    // show close button 
    operIcon.style.display = "block";
    closeIcon.style.display = "none";
    // show details
    detailFieldsSection.style.height = "0px";
  }
  //end of personal details fields event section -----------------------------------
  //  start the employeement details fields event fields section 
  const showEmployeeDetailsFields = () => {
    let openEmployeeFieldIcon = document.getElementById("open-employye-details-icon");
    let closeEmployeeFieldIcon = document.getElementById("close-employee-details-icon");
    let employeeFieldsWrapper = document.getElementById("employee-details-wrapper");
    let employeeDetailsFields = document.getElementById("employee-details-fields");

    // set the values
    openEmployeeFieldIcon.style.display = "none";
    closeEmployeeFieldIcon.style.display = "block";
    employeeFieldsWrapper.style.height = "100%";
    employeeFieldsWrapper.style.border = "1px solid rgb(228 228 231/1)";
  }
  const hideEmployeesDetailsFields = () => {
    let openEmployeeFieldIcon = document.getElementById("open-employye-details-icon");
    let closeEmployeeFieldIcon = document.getElementById("close-employee-details-icon");
    let employeeFieldsWrapper = document.getElementById("employee-details-wrapper");
    let employeeDetailsFields = document.getElementById("employee-details-fields");

    // set the values
    openEmployeeFieldIcon.style.display = "block";
    closeEmployeeFieldIcon.style.display = "none";
    employeeFieldsWrapper.style.height = "0px";
    employeeFieldsWrapper.style.border = "0px solid rgb(228 228 231/1)";
  }
  // end of education section event handling code -------------------------------------
  // start the education details sectin event handling code --------------------------------
  const showEducationDetailsFields = () => {
    let openEducationFieldIcon = document.getElementById("open-education-details-icon");
    let closeEducationFieldIcon = document.getElementById("close-education-details-icon");
    let educationFieldsWrapper = document.getElementById("education-details-wrapper");


    // set the values
    openEducationFieldIcon.style.display = "none";
    closeEducationFieldIcon.style.display = "block";
    educationFieldsWrapper.style.height = "100%";
    educationFieldsWrapper.style.border = "1px solid rgb(228 228 231/1)";
  }
  const hideEducationDetailsFields = () => {
    let openEducationFieldIcon = document.getElementById("open-education-details-icon");
    let closeEducationFieldIcon = document.getElementById("close-education-details-icon");
    let educationFieldsWrapper = document.getElementById("education-details-wrapper");


    // set the values
    openEducationFieldIcon.style.display = "block";
    closeEducationFieldIcon.style.display = "none";
    educationFieldsWrapper.style.height = "0px";
    educationFieldsWrapper.style.border = "0px solid rgb(228 228 231/1)";
  }
  // end of education details section event handling code ---------------------------------------------
  // start the skills section event handling code -----------------------------------------------------
  const showSkillsSection = () => {
    let showSkillsSectionIcon = document.getElementById("open-skills-section")
    let closeSkillsSectionIcon = document.getElementById("close-skills-section")
    let skillsSectionWrapper = document.getElementById("skills-section-wrapper")
    // apply changes
    showSkillsSectionIcon.style.display = "none";
    closeSkillsSectionIcon.style.display = "block";
    skillsSectionWrapper.style.height = "100%";
    skillsSectionWrapper.style.border = "1px solid rgb(228 228 231/1)";
  }
  // hide skill section ------------------------
  const hideSkillsSection = () => {
    let showSkillsSectionIcon = document.getElementById("open-skills-section")
    let closeSkillsSectionIcon = document.getElementById("close-skills-section")
    let skillsSectionWrapper = document.getElementById("skills-section-wrapper")
    // apply changes
    showSkillsSectionIcon.style.display = "block";
    closeSkillsSectionIcon.style.display = "none";
    skillsSectionWrapper.style.height = "0px";
    skillsSectionWrapper.style.border = "0px solid rgb(228 228 231/1)";
  }
  // start the languages section evenet ----------------------------------
  const showLanguagesSection = () => {
    let showLanguagesSectionIcon = document.getElementById("open-languages-section")
    let closeLanguagesSectionIcon = document.getElementById("close-languages-section")
    let languagesSectionWrapper = document.getElementById("languages-section-wrapper")
    // apply changes
    showLanguagesSectionIcon.style.display = "none";
    closeLanguagesSectionIcon.style.display = "block";
    languagesSectionWrapper.style.height = "100%";
    languagesSectionWrapper.style.border = "1px solid rgb(228 228 231/1)";
  }
  // hide skill section ------------------------
  const hideLanguagesSection = () => {
    let showLanguagesSectionIcon = document.getElementById("open-languages-section")
    let closeLanguagesSectionIcon = document.getElementById("close-languages-section")
    let languagesSectionWrapper = document.getElementById("languages-section-wrapper")
    // apply changes
    showLanguagesSectionIcon.style.display = "block";
    closeLanguagesSectionIcon.style.display = "none";
    languagesSectionWrapper.style.height = "0px";
    languagesSectionWrapper.style.border = "0px solid rgb(228 228 231/1)";
  }
  // for profile section event handling ----------------------------------
  const showProfileSection = () => {
    let showProfileSectionIcon = document.getElementById("open-profile-section")
    let closeProfileSectionIcon = document.getElementById("close-profile-section")
    let ProfileSectionWrapper = document.getElementById("profile-section-wrapper")
    // apply changes
    showProfileSectionIcon.style.display = "none";
    closeProfileSectionIcon.style.display = "block";
    ProfileSectionWrapper.style.height = "100%";
    ProfileSectionWrapper.style.border = "1px solid rgb(228 228 231/1)";
  }
  // hide the profile section ------------------------------------------------
  const hideProfileSection = () => {
    let showProfileSectionIcon = document.getElementById("open-profile-section")
    let closeProfileSectionIcon = document.getElementById("close-profile-section")
    let ProfileSectionWrapper = document.getElementById("profile-section-wrapper")
    // apply changes
    showProfileSectionIcon.style.display = "block";
    closeProfileSectionIcon.style.display = "none";
    ProfileSectionWrapper.style.height = "0px";
    ProfileSectionWrapper.style.border = "0px solid rgb(228 228 231/1)";
  }

  // for internship section event handling code ---------------------------------------------
  const showInternshipDetailsFields = () => {
    let showInternshipSectionIcon = document.getElementById("open-internship-section")
    let closeInternshipSectionIcon = document.getElementById("close-internship-section")
    let InternshipSectionWrapper = document.getElementById("internship-details-wrapper")
    // apply changes
    showInternshipSectionIcon.style.display = "none";
    closeInternshipSectionIcon.style.display = "block";
    InternshipSectionWrapper.style.height = "100%";
    InternshipSectionWrapper.style.border = "1px solid rgb(228 228 231/1)";
  }
  const hideInternshipDetailsFields = () => {
    let showInternshipSectionIcon = document.getElementById("open-internship-section")
    let closeInternshipSectionIcon = document.getElementById("close-internship-section")
    let InternshipSectionWrapper = document.getElementById("internship-details-wrapper")
    // apply changes
    showInternshipSectionIcon.style.display = "block";
    closeInternshipSectionIcon.style.display = "none";
    InternshipSectionWrapper.style.height = "0px";
    InternshipSectionWrapper.style.border = "0px solid rgb(228 228 231/1)";
  }
  // for the certificate detail section event handling code
  const showCertificateDetailsFields = () => {
    let showCertificateSectionIcon = document.getElementById("open-certificate-details")
    let closeCertificateSectionIcon = document.getElementById("close-certificate-details")
    let CertificateSectionWrapper = document.getElementById("certificate-details-wrapper")
    // apply changes
    showCertificateSectionIcon.style.display = "none";
    closeCertificateSectionIcon.style.display = "block";
    CertificateSectionWrapper.style.height = "100%";
    CertificateSectionWrapper.style.border = "1px solid rgb(228 228 231/1)";
  }
  const hideCertificateDetailsFields = () => {
    let showCertificateSectionIcon = document.getElementById("open-certificate-details")
    let closeCertificateSectionIcon = document.getElementById("close-certificate-details")
    let CertificateSectionWrapper = document.getElementById("certificate-details-wrapper")
    // apply changes
    showCertificateSectionIcon.style.display = "block";
    closeCertificateSectionIcon.style.display = "none";
    CertificateSectionWrapper.style.height = "0px";
    CertificateSectionWrapper.style.border = "0px solid rgb(228 228 231/1)";
  }

  // call the useeffect functin
  useEffect(() => {
    setCollageDate(date.toLocaleDateString("en-US"))
  })
  return <>
    {/* create header */}
    <header className="header">
      <nav>
        <div className="buttons">
          <button onClick={downloadResume}>download</button>
          <button onClick={saveResume}>save</button>
        </div>
      </nav>
    </header>
    {/* end of header */}

    {/* start the form and resume generating section */}
    <section className="details-section">
      <div className="details-filling-section">
        <div className="details">
          {/* personal details ---------------------------------------------------- */}
          <div className="persional-details">
            <div className="header">
              <div className="heading">personal detials</div>
              <div className="icon-wrapper" ><AddIcon onClick={showPersonalDetailFields} className='add-icon' id="open-icon" /><KeyboardArrowDownIcon onClick={hidePersonalDetailFields} className='close-icon' id="close-icon" /></div>
            </div>
            {/* start the form section */}
            <div className="details-fields-wrapper" >
              <div className="details-fields" id='details-fields'>
                <div className="detail-fields-header">
                  <div className="right">
                    <div className="detail-combo-fields">
                      <div className="form-field">
                        <div className="label">First name</div>
                        <input type="text" value={PersonalDetails.firstname} id='firstname' onChange={createObj} />
                      </div>
                      <div className="form-field">
                        <div className="label">Last name</div>
                        <input  value={PersonalDetails.lastname} type="text" id='lastname' onChange={createObj} />
                      </div>
                    </div>
                    <div className="single-field">
                      <div className="label">email address</div>
                      <input  value={PersonalDetails.email} id='email' onChange={createObj} type="text" email />
                    </div>
                  </div>
                </div>
                {/* end of header fields */}
                <div className="other-fields">
                  <div className="form-field">
                    <div className="label">headline</div>
                    <input  value={PersonalDetails.headline} id='headline' onChange={createObj} type="text" />
                  </div>
                  <div className="form-field">
                    <div className="label">phone number</div>
                    <input type="text"  value={PersonalDetails.mobile} id='mobile' onChange={createObj} />
                  </div>
                  <div className="form-field">
                    <div className="label">Address</div>
                    <input onChange={createObj}  value={PersonalDetails.address} id='address' type="text" />
                  </div>
                  <div className="postCode-city">
                    {/* <div className="form-field">
                      <div className="label">post code</div>
                      <input onChange={createObj} id='postcode' type="text" />
                    </div> */}
                    <div className="form-field">
                      <div className="label">city</div>
                      <input  value={PersonalDetails.city} id='city' onChange={createObj} type="text" />
                    </div>

                    <div className="form-field">
                      <div className="label">github link</div>
                      <input  value={PersonalDetails.githublink} id='githublink' onChange={createObj} type="text" />
                    </div>


                  </div>
                  {/* end of combo field for post code and city */}

                  {/* combo fields for birthdate gender linkedin */}
                  <div className="combo-three-fields">
                    <div className="form-field">
                      <div className="label">website</div>
                      <input  value={PersonalDetails.website} onChange={createObj} id='website' type="text" />
                    </div>
                    <div className="form-field">
                      <div className="label">linkedin</div>
                      <input id='linkedinprofile' value={PersonalDetails.linkedinprofile} onChange={createObj} type="text" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* for border div */}
            <div className="hr"></div>
          </div>
          {/* end of  personal details section ---------------------------------------------------- */}

          {/* start the education section ----------------------------------------------------------- */}
          <div className="education-details" >
            <div className="header">
              <div className="heading">education</div>
              <div className="icon-wrapper" ><AddIcon className='add-icon' onClick={showEducationDetailsFields} id="open-education-details-icon" /><KeyboardArrowDownIcon onClick={hideEducationDetailsFields} className='close-icon' id="close-education-details-icon" /></div>
            </div>

            {/* start the edicatopm fields section ---------------------------------------------------- */}
            <div className="education-details-wrapper" id='education-details-wrapper'>
              <div className="education-details-fields" id='education-details-fields'>
                <div className="form-field">
                  <div className="label">specialization</div>
                  <input  value={PersonalDetails.branch} onChange={createObj} id="branch" type="text" />
                </div>
                {/* combo fields for city and employeer */}
                <div className="combo-fields">
                  <div className="form-field">
                    <div className="label">collage name</div>
                    <input  value={PersonalDetails.collagename} onChange={createObj} id='collagename' type="text" />
                  </div>
                  <div className="form-field">
                    <div className="label">city</div>
                    <input onChange={createObj} id='collagecity' type="text" />
                  </div>
                </div>
                {/* end of combo fields */}
                {/* agani combo fields for employer date end date and present date */}
                <div className="education-dates-cgpa">
                  <div className="form-field">
                    <div className="label">cgpa</div>
                    <input  value={PersonalDetails.cgpa} onChange={createObj} id='cgpa' type="text" />
                  </div>
                  <div className="form-field">
                    <div className="label">end date</div>
                    <input  value={PersonalDetails.collageenddate} onChange={createObj} id='collageenddate' type="date" />
                  </div>

                </div>

                {/* <div className="button-section">
                  <div className="buttons">
                    <div className="delete-btn"><DeleteOutlinedIcon className='delete-icon' /></div>
                    <div className="save-btn"><button><CheckIcon className='right-icon' />done</button></div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="hr"></div>
          </div>
          {/* end of the education section ------------------------------------------------------------ */}


          {/* start the skills section ---------------------------------------------------------------- */}
          <div className="skills-section" >
            <div className="header">
              <div className="heading">skills</div>
              <div className="icon-wrapper" ><AddIcon className='add-icon' onClick={showSkillsSection} id="open-skills-section" /><KeyboardArrowDownIcon onClick={hideSkillsSection} className='close-icon' id="close-skills-section" /></div>
            </div>

            {/* start the skills section wrapper ------------------------------------  */}
            <div className="skills-section-wrapper" id='skills-section-wrapper'>
              <div className="skills-section-fields" id='skills-section-fields'>

                <div className="form-field">
                  <div className="label">skill</div>
                  <input   id='skills-field' type="text" onChange={CreateSkill} value={Skill} />
                </div>
                <div className="buttons">
                  <div className="delete-btn"><DeleteOutlinedIcon onClick={clearAllSkill} className='delete-icon' /></div>
                  <div className="save-btn"><button onClick={AddSkilss}><CheckIcon className='right-icon' />done</button></div>
                </div>

              </div>
            </div>
            {/* end of the skills section wrapper --------------------------- */}

            <div className="hr"></div>
          </div>
          {/* end of the skills section --------------------------------------------------------------- */}


          {/* start the profile section ------------------------------------------------------------------- */}
          <div className="profile-section" >
            <div className="header">
              <div className="heading">profile</div>
              <div className="icon-wrapper" ><AddIcon className='add-icon' onClick={showProfileSection} id="open-profile-section" /><KeyboardArrowDownIcon onClick={hideProfileSection} className='close-icon' id="close-profile-section" /></div>
            </div>

            {/* start the languages section wrapper ------------------------------------  */}
            <div className="profile-section-wrapper" id='profile-section-wrapper'>
              <div className="profile-section-fields" id='profile-section-fields'>

                <div className="form-field">
                  <div className="label">description</div>
                  <textarea value={PersonalDetails.profilesummary} onChange={createObj} id="profilesummary"></textarea>
                </div>
              </div>
            </div>
            {/* end of the profile section  wrapper --------------------------- */}

            <div className="hr"></div>
          </div>
          {/* end of the profile section ------------------------------------------------------------------ */}

          {/* start the internship section ----------------------------------------------------------------- */}
          <div className="internship-details" >
            <div className="header">
              <div className="heading">internship</div>
              <div className="icon-wrapper" ><AddIcon className='add-icon' onClick={showInternshipDetailsFields} id="open-internship-section" /><KeyboardArrowDownIcon onClick={hideInternshipDetailsFields} className='close-icon' id="close-internship-section" /></div>
            </div>

            {/* start the employeement fields section  */}
            <div className="internship-details-wrapper" id='internship-details-wrapper'>
              <div className="internship-details-fields" id='internship-details-fields'>
                <div className="form-field">
                  <div className="label">company</div>
                  <input  type="text" onChange={createInternshipDetails} value={internshipDetails.companyname} id="companyname" />
                </div>

                {/* agani combo fields for employer date end date and present date */}
                <div className="internship-dates">
                  <div className="form-field">
                    <div className="label">start date</div>
                    <input type="date" value={internshipDetails.startdate} onChange={createInternshipDetails} id="startdate" />
                  </div>
                  <div className="form-field">
                    <div className="label">end date</div>
                    <input type="date" value={internshipDetails.enddate} onChange={createInternshipDetails} id="enddate" />
                  </div>

                </div>
                {/* end of employer date and end dates section  */}
                <div className="internship-description">
                  <div className="label">description</div>
                  <textarea value={internshipDetails.internshipdesc} onChange={createInternshipDetails} id="internshipdesc"></textarea>
                </div>

                <div className="button-section">
                  <div className="buttons">
                    <div className="delete-btn"><DeleteOutlinedIcon className='delete-icon' /></div>
                    <div className="save-btn"><button onClick={addInternship}><CheckIcon className='right-icon' />done</button></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hr"></div>
          </div>
          {/* end of the internship section ----------------------------------------------------------------- */}


          {/* start the certificate details section ------------------------------------------------------------------- */}
          <div className="certificate-details" >
            <div className="header">
              <div className="heading">certificate</div>
              <div className="icon-wrapper" ><AddIcon className='add-icon' onClick={showCertificateDetailsFields} id="open-certificate-details" /><KeyboardArrowDownIcon onClick={hideCertificateDetailsFields} className='close-icon' id="close-certificate-details" /></div>
            </div>

            {/* start the employeement fields section  */}
            <div className="certificate-details-wrapper" id='certificate-details-wrapper'>
              <div className="certificate-details-fields" id='certificate-details-fields'>

                <div className="form-field">
                  <div className="label">certificate</div>
                  <input type="text" id='certificatename' value={certificateDetails.certificatename} onChange={createCertificate} />
                </div>

                <div className="form-field">
                  <div className="label">date</div>
                  <input id='certificatedate' value={certificateDetails.certificatedate} onChange={createCertificate} type="date" />
                </div>

                {/* cetificate period time combo fields --------------------------------------------- */}
                {/* <div className="certificate-period-times">
                  <div className="label">period</div>
                  <div className="form-fields">
                    <div className="form-field">
                      <select >
                        <option value="Month" selected>Month</option>
                        <option value="january">january</option>
                        <option value="fabuary">fabuary</option>
                        <option value="march">march</option>
                        <option value="april">april</option>
                        <option value="mai">mai</option>
                        <option value="jun">jun</option>
                        <option value="july">july</option>
                        <option value="agust">agust</option>
                        <option value="sitamber">sitamber</option>
                        <option value="actumber">actumber</option>
                        <option value="november<">november</option>
                        <option value="dicember">dicember</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <select >
                        <option value="year" selected>year</option>
                        <option value="1923">1923</option>
                      </select>
                    </div>
                  </div>

                </div> */}
                {/* end of the certificate period time combo fields --------------------------------- */}

                <div className="certificate-description">
                  <div className="label">description</div>
                  <textarea value={certificateDetails.certificatedesc} onChange={createCertificate} id='certificatedesc'></textarea>
                </div>

                <div className="button-section">
                  <div className="buttons">
                    <div className="delete-btn"><DeleteOutlinedIcon onClick={clearAllCertificate} className='delete-icon' /></div>
                    <div className="save-btn" onClick={addCertificate}><button><CheckIcon className='right-icon' />done</button></div>
                  </div>
                </div>
              </div>
            </div>
            {/* end of the wrapper section  */}

            <div className="hr"></div>
          </div>
          {/* end of the certificate details section ------------------------------------------------------------------ */}
        </div>

      </div>
      <div className="generated-resume-section " id='resume_template'>
        {/* <ResumeTemplate personalDetails={{ ...PersonalDetails }} skills={skills} certificatesArray={CertificatesArr}/> */}
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
                    <li className='email'><EmailIcon className='icon' /><div className="email-address">{PersonalDetails.firstname}</div></li>
                    <li ><CallIcon className='icon' /> +91{PersonalDetails.mobile}</li>
                    <li className='address'><HomeIcon className='icon' /><div className="address-name">{PersonalDetails.address}</div></li>
                  </ul>
                </div>
                <div className="technical-skills">
                  <div className="heading">technical skills</div>
                  <div className="divider"></div>
                  <div className="skills-list">
                    <ul>
                      {
                        skills.map((skill) => {
                          return (<li>{skill}</li>);
                        })
                      }
                    </ul>
                  </div>
                </div>
                <div className="profiles">
                  <div className="heading">Profiles</div>
                  <div className="divider"></div>
                  <div className="profile-list">
                    <div className="profile">
                      <div className="profile-heading">website link</div>
                      <div className="profile-link">{PersonalDetails.website}</div>
                    </div>
                    <div className="profile">
                      <div className="profile-heading">github profile</div>
                      <div className="profile-link">{PersonalDetails.githublink}</div>
                    </div>
                    <div className="profile">
                      <div className="profile-heading">Linkedin profile</div>
                      <div className="profile-link">{PersonalDetails.linkedinprofile}</div>
                    </div>
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
                    {
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
                    }


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
                    <div className="education-date">{collageDate}</div>
                  </div>
                </div>
                {/* end the education section ------------------------------------------------ */}
                <div className="certifications">
                  <div className="certificate-heading">certifications</div>
                  <div className="divider"></div>
                  <div className="certificate">
                    {
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
                    }

                  </div>
                </div>
                {/* end fo certifications details ----------------------- */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}