import { Link } from "react-router-dom";
export const NavigationBar = () => {
    return <>

        <header>
            <nav>
                <div className="logo">Pixel Resume</div>
                <div className="menus">
                    <ul>
                        <li><Link to="/pixelresume/templates">templates</Link></li>
                        <li><Link to="/pixelresume/mycv">my cv</Link></li>
                        <li><Link to="/pixelresume/tips">resume tips</Link></li>
                    </ul>
                </div>
                <div className="auth">
                    <div className="buttons">
                        <button className="sign in-btn"><Link to="/pixelresume/signup" className="link">signup</Link></button>
                        <button className="logout-btn"><Link to="/pixelresume/login" className="link">login</Link></button>
                    </div>
                </div>
            </nav>
        </header>

    </>
}