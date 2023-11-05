
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageContent } from "./components/Index/Content";
import { Footer } from "./components/Index/Footer";
import { NavigationBar } from "./components/Index/Navbar";
import "../src/components/CreateResume/css/ResumeTemplateStyle.css"
import "./css/Style.css"
import "./components/About/About.css"
import "./components/ResumeTips/TipsViewStyle.css"
import "./css/IndexStyle.css"
import "./components/Mycv/MycvStyle.css"
import "./components/AuthenticationComponents/AuthenticationStyle.css"
import "../src/components/ResumeTemplates/TemplateStyle.css"
import "./components/CreateResume/css/ResumeGenerate.css"
import { ResumeGeneratingPage } from "./components/CreateResume/DetailsFelling";
import { Templates } from "./components/ResumeTemplates/TemplatesPage";

import { SignupView, SignUpView } from "./components/AuthenticationComponents/SignupComponent";
import { LoginView } from "./components/AuthenticationComponents/LoginComponent";
import { ResumeTipsView } from "./components/ResumeTips/ResumeTipsComponent";
import MyCv from "./components/Mycv/Mycv";

const App=()=>{
  return<>
  <BrowserRouter>
  <Routes>
    <Route path="" element={<PageContent/>}></Route>
    <Route path="/pixelresume/signup" element={<SignupView/>}></Route>
    <Route path="/pixelresume/login" element={<LoginView/>}></Route>
    <Route path="/pixelresume/templates" element={<Templates/>}></Route>
    <Route path="/pixelresume/mycv" element={<MyCv/>}></Route>
    <Route path="/pixelresume/tips" element={<ResumeTipsView/>}></Route>
    <Route path="/pixelresume/createresume" element={<ResumeGeneratingPage/>}></Route>
  </Routes>

</BrowserRouter>
 
  </>
}

export default App;