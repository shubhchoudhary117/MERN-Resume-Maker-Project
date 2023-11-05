import { NavigationBar } from "../Index/Navbar"
import { Link } from "react-router-dom"

export const ResumeTipsView = () => {

    return <>
        <header className="resume-tips-header">
            <nav>
                <div className="resume-tips-logo">pixel resume</div>
            </nav>
        </header>

        <section className="resume-tips-section">
            <div className="tips-content">
                <div className="tips_1">
                    <div className="tips-title">How to write a good resume</div>
                    <div className="tips-text">
                        Your resume must clearly, concisely and strategically present your qualifications to get a
                        recruiter interested in meeting you. It should convey your skills, work experience and assets.
                        The resume is used to describe what you can accomplish professionally in a manner that also
                        illustrates what you can do for an employer. Job opportunities can arise unexpectedly.
                        An updated modern resume is the key to a successful job search.
                        Here are some do's and don'ts of how to write a good resume and what to include.
                    </div>
                </div>
                <div className="tips_2">
                    <div className="tips-title">Resume Writing Do's</div>
                    <div className="tips_2_subtips">
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uis uis-check"></i>Keep your resume clear and concise</div>
                            <div className="sub-tip-text">An employer takes an average of 30 seconds to skim a resume. You want them to see right away that you are qualified for the position.</div>
                        </div>
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uis uis-check"></i>Be honest</div>
                            <div className="sub-tip-text">Lying on your resume is never a good idea. You don't want to overstate your skills or results as it will mislead the employer. Have confidence in what you have to offer.</div>
                        </div>
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uis uis-check"></i>Use simple words and action verbs</div>
                            <div className="sub-tip-text">The person reading your resume might not always be the employer. Resumes can be reviewed by recruiters or Human Resources specialists who may not be familiar with your specific field. Use simple and plain language, but also persuasive verbs such as handled, managed, led, developed, increased, accomplished, leveraged, etc.</div>
                        </div>
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uis uis-check"></i>Include unpaid work that show off your skills</div>
                            <div className="sub-tip-text">If you have volunteered with a well-known organization or worked for an important cause, put it in your resume. You should include these experiences under the "Work experience" or the "Volunteer work" section, especially if they are related to the position you are applying for.</div>
                        </div>
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uis uis-check"></i>Double check and include your contact information</div>
                            <div className="sub-tip-text">Your resume should list your name, address, email and phone number. This information should be placed at the top of the first page. Also, make sure this information is accurate. Otherwise, the employer won't be able to contact you.</div>
                        </div>
                    </div>
                </div>
                {/* end of tips 2 */}
                <div className="tips_3">
                    <div className="tips-title">Resume Writing Don't</div>
                    <div className="tips_3_subtips">
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uil uil-ban"></i>Don't use an inappropriate email address</div>
                            <div className="sub-tip-text">Make sure your email is easy to read, easy to type, professional and non offensive. In general, your email address should be based on your name. Exclude any nicknames, numbers, or special characters.</div>
                        </div>
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uil uil-ban"></i>Don't include unnecessary personal information</div>
                            <div className="sub-tip-text">It is best to leave out any personal details such as age, weight, height, marital status, religious preference, political views, or any other personal attributes that could be controversial. This will prevent any potential bias. Most importantly, never include your Social Insurance Number in your resume.</div>
                        </div>
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uil uil-ban"></i>Don't include a picture of yourself</div>
                            <div className="sub-tip-text">Although in some countries it may be acceptable to include a photo, it is not the norm in Canada. It can actually lower your chances of obtaining a position and divert the whole focus of your resume. You want the employer to focus on your skills and experience, not what you look like.</div>
                        </div>
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uil uil-ban"></i>Don't use too many bullets</div>
                            <div className="sub-tip-text">Make your resume easy to read by limiting each resume section or sub section to 5-7 bullet points. This will make it easier for the employer to scan your resume and identify your potential. Each bullet point should be used wisely by keeping the information relevant and concise.</div>
                        </div>
                        <div className="tip">
                            <div className="sub-tip-title"><i class="uil uil-ban"></i>Don't include hobbies or interests</div>
                            <div className="sub-tip-text">It is not recommended to mention hobbies because of the judgments potential employers can make. However, if your hobbies relate to the position, you may include them as they can demonstrate to the employer why you are a good fit.</div>
                        </div>
                    </div>
                </div>
                {/* end of tips 3 */}
                <div className="footer">Want to create a professional resume in a few minutes?
                    <Link className="link" to="/pixelresume/signup">signup</Link> for a Job Bank account to use our free Resume Builder tool.
                </div>
            </div>

            <footer>
                <p>pixelwala@gmail.com</p>
            </footer>

        </section>
    </>

}