import { Footer } from "./Footer"
import { NavigationBar } from "./Navbar"
import { Link } from "react-router-dom"

export const PageContent = () => {
    return <>
        <NavigationBar/>
        <section className="index-page-background-section">
            <div className="content">
                <h3 className="heading">
                    Create a professional resume
                </h3>
                <p className="text">Fill in the blanks, choose a template, and download your resume instantly.</p>
                <div className="button">
                    <button><Link to="/pixelresume/createresume" className="link"> create resume</Link></button>
                </div>
            </div>
        </section>
        {/* end of background section */}
        {/* start the template images section */}
        <section className="templates-images-section">
            <div className="heading">templates</div>
            <div className="templates">
                <div className="template">
                    <img src={process.env.PUBLIC_URL + "/photos/template1.svg"} />
                </div>
                <div className="template">
                    <img src={process.env.PUBLIC_URL + "/photos/template2.svg"} />
                </div>
                <div className="template">
                    <img src={process.env.PUBLIC_URL + "/photos/template3.svg"} />
                </div>
            </div>
        </section>
        {/* start the how it is working section */}

        <section className="steps-section">
            <div className="heading">how it works</div>
            <div className="steps-wrapper">
                <div className="steps">
                    <div className="step">
                        <div className="left">
                            <div className="step-number">1</div>
                        </div>
                        <div className="right">
                            <div className="step-heading1">fill in the blanks</div>
                            <div className="step-heading2">start by filling details in your resume</div>
                        </div>
                    </div>
                    {/* end of step 1 */}
                    <div className="step">
                        <div className="left">
                            <div className="step-number">2</div>
                        </div>
                        <div className="right">
                            <div className="step-heading1">pick a template</div>
                            <div className="step-heading2">select a resume template that embodies your style</div>
                        </div>
                    </div>
                    {/* end of step 2 */}
                    <div className="step">
                        <div className="left">
                            <div className="step-number">3</div>
                        </div>
                        <div className="right">
                            <div className="step-heading1">download or save your resume</div>
                            <div className="step-heading2">download your resume or save the generated resume on website</div>
                        </div>
                    </div>
                    {/* end of step 3*/}
                </div>
            </div>
        </section>

        {/* end of steps section  */}
        {/* start the show demo project image */}
        <section className="demo-image-section">
            <div className="image">
                <img src={process.env.PUBLIC_URL + "/photos/demo-img.png"} />
            </div>
        </section>

        {/* end of demo section  */}
        <section className="professional-section">
            <div className="container">
                <div className="left">
                    <div className="professional-content">
                        <h1 className="heading">Impress potential employers with your resume</h1>
                        <h3 className="text">Follow step-by-step professional guidance to create a polished resume in minutes.</h3>
                        <div className="button">
                            <button className="create-resume-btn">create resume</button>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="hovering-div">
                        <div className="left-images">
                            <div className="image">
                                <img src={process.env.PUBLIC_URL+"/photos/template1.svg"} alt="image is loading" />
                            </div>
                            <div className="image">
                                <img src={process.env.PUBLIC_URL+"/photos/template2.svg"} alt="image is loading" />
                            </div>
                            <div className="image">
                                <img src={process.env.PUBLIC_URL+"/photos/template3.svg"} alt="image is loading" />
                            </div>
                        </div>
                        <div className="right-images">
                        <div className="image">
                                <img src={process.env.PUBLIC_URL+"/photos/template4.svg"} alt="image is loading" />
                            </div>
                            <div className="image">
                                <img src={process.env.PUBLIC_URL+"/photos/template5.svg"} alt="image is loading" />
                            </div>
                            <div className="image">
                                <img src={process.env.PUBLIC_URL+"/photos/template6.svg"} alt="image is loading" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* foooter */}
        <Footer/>


    </>
}