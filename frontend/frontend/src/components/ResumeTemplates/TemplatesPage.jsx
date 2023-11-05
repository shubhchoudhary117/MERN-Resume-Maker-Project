

export const Templates=()=>{
    return <>
    
        <header>
            <nav>
                <div className="logo">pixel wala</div>
            </nav>
        </header>

        <section className="templates-section">
            <div className="heading">
                <div className="title">CV Templates</div>
                <div className="text">Impress employers with a professional CV template.</div>
            </div>
            <div className="templates-Container">
                <div className="template">
                    <img src={process.env.PUBLIC_URL+"/photos/template1.svg"} alt="" />
                </div>
                <div className="template">
                    <img src={process.env.PUBLIC_URL+"/photos/template2.svg"} alt="" />
                </div>
                <div className="template">
                    <img src={process.env.PUBLIC_URL+"/photos/template3.svg"} alt="" />
                </div>
                <div className="template">
                    <img src={process.env.PUBLIC_URL+"/photos/template4.svg"} alt="" />
                </div>
                <div className="template">
                    <img src={process.env.PUBLIC_URL+"/photos/template5.svg"} alt="" />
                </div>
                <div className="template">
                    <img src={process.env.PUBLIC_URL+"/photos/template6.svg"} alt="" />
                </div>
            </div>
        </section>
    
    </>
}