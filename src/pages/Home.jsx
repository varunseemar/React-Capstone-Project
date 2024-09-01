import {useState} from "react"
import "./Home.css"
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    const [Data,setData] = useState({
        name:"",
        userName:"",
        email:"",
        mobile:"",
        checkbox:false,
    });

    const [Errors,setErrors] = useState({
        name:"",
        userName:"",
        email:"",
        mobile:"",
        checkbox:"",
    });

    const handleInput = (e) => {
        setData({
            ...Data,
            [e.target.name] : e.target.name === "checkbox" ? e.target.checked : e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let errors = {};
        if(!Data.name || Data.name.trim() === ""){
            errors.name = "Name is Required"
        }
        if(!Data.userName || Data.userName.trim() === ""){
            errors.userName = "Username is Required"
        }
        if(!Data.email || Data.email.trim() === ""){
            errors.email = "Email is Required"
        }
        if(!Data.mobile || Data.mobile.trim() === ""){
            errors.mobile = "Mobile is Required"
        }
        if(!Data.checkbox){
            errors.checkbox = "Check this box if you want to proceed"
        }
        setErrors(errors);
        if(Object.keys(errors).length > 0){
            return;
        }
        else{
            alert("Form Submitted Successfully")
            localStorage.setItem("userData",JSON.stringify(Data))
            setData({
                name:"",
                userName:"",
                email:"",
                mobile:"",
                checkbox:false,   
            })
            navigate("/MovieSelection");
        }
    }
    
    return (
        <>
        <div className="Home" style={{display:"flex",backgroundColor:"black"}}>
            <div className="HomeImage">
                <img src="../../public/Images/image13.png" alt="Homepageimage" style={{width:"47vw",height:"99.5vh"}}/>
                <div className="Discover" >
                    Discover new things on Superapp
                </div>
            </div>
            <div className="HomeItems">
                <div className="superapp">
                    Super App
                </div>
                <div className="create">
                    Create Your New Account
                </div>
                <div className="form">
                 <form onSubmit={handleSubmit}> 
                    <input type="text" placeholder="Name" name="name" value={Data.name} onChange={handleInput}/>
                    <span style={{color:"#FF0000",marginLeft:"158px"}}>{Errors.name}</span>
                    <input type="text" placeholder="Username" name="userName" value={Data.userName} onChange={handleInput}/>
                    <span style={{color:"#FF0000",marginLeft:"158px"}}>{Errors.userName}</span>
                    <input type="email" placeholder="Email" name="email" value={Data.email} onChange={handleInput}/>
                    <span style={{color:"#FF0000",marginLeft:"158px"}}>{Errors.email}</span>
                    <input type="tel" placeholder="Mobile Number" name="mobile" value={Data.mobile} onChange={handleInput}/>
                    <span style={{color:"#FF0000",marginLeft:"158px"}}>{Errors.mobile}</span>
                    <div>
                    <input type="checkbox" id="checkbox" name="checkbox" checked={Data.checkbox} onChange={handleInput}/> 
                        <label htmlFor="checkbox" style={{color:"#7C7C7C",marginLeft:"10px",fontSize:"17px",fontFamily:"DM Sans"}}>Share my registration data with the Superapp</label>
                    <p style={{color:"#FF0000",marginLeft:"158px",fontFamily:"DM Sans"}}>{Errors.checkbox}</p>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                </div>
                <div style={{color:"#7C7C7C",marginLeft:"158px",marginTop:"23px",wordSpacing:"5px",fontFamily:"Roboto"}}>
                By clicking on Sign up. you agree to Superapp <span style={{color:"#72DB73"}}>Terms and <br/>Conditions of Use</span>
                </div>
                <div style={{color:"#7C7C7C",marginLeft:"158px",marginTop:"15px",wordSpacing:"5px",fontFamily:"Roboto"}}>
                To learn more about how Superapp collects, uses, shares and <br/>protects your personal data please head Superapp <span style={{color:"#72DB73"}}>Privacy<br/> Policy</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;