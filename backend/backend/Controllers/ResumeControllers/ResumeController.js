import { response } from "express";
import ResumeDataModel from "../../models/ResumeModels/ResumeDataModel.js";
import GetUserFromToken from "../../Jwt/TokenVerification.js";
// Resume All actions such as save delete update
class ResumeController {

    static AddResume = (req, res) => {

        var ResumeModel = new ResumeDataModel();
        // insert the detals
        ResumeModel.firstname = req.body.CommanDetails.firstname
        ResumeModel.lastname = req.body.CommanDetails.lastname
        ResumeModel.email = req.body.CommanDetails.email
        ResumeModel.address = req.body.CommanDetails.address
        ResumeModel.headline = req.body.CommanDetails.headline
        ResumeModel.mobile = req.body.CommanDetails.mobile
        ResumeModel.profiledescription = req.body.profiledesc
        ResumeModel.websitelink = req.body.CommanDetails.website
        ResumeModel.githublink = req.body.CommanDetails.githublink
        ResumeModel.linkedin = req.body.CommanDetails.linkedinprofile
        ResumeModel.collagename = req.body.CommanDetails.collagename
        ResumeModel.collageenddate = req.body.CommanDetails.collageenddate
        ResumeModel.cgpa = req.body.CommanDetails.cgpa
        ResumeModel.branchname = req.body.branch
        ResumeModel.skills = req.body.CommanDetails.skills
        ResumeModel.internships = req.body.CommanDetails.internships
        ResumeModel.certificates = req.body.CommanDetails.certificates

        // get the user from toke
        let token = req.body.token;
        let user = GetUserFromToken(token);
        // set the user in model
        ResumeModel.UserEmail = user;
        // save the resume
        const addedResume = ResumeModel.save().then((response) => {
            return res.json({ "resumeAdded": true, "somethingWentWrong": false })
        })
            .catch((error) => {
                return res.json({ "resumeAdded": false, "somethingWentWrong": true })
            })

    }
    // end of add resume function

    static GetResume = async (req, res) => {
        var token = req.body.token;
        // get user from token call the service
        let userEmail = GetUserFromToken(token);
        // get all documents
        let response = await ResumeDataModel.find({UserEmail:userEmail})
        // check and send response
        if (response) {
            return res.json({ "resumeData": response, "somethingWentWrong": false })
        } else {
            return res.json({ "resumeData":"", "somethingWentWrong": true })
        }


    }

}

export default ResumeController;