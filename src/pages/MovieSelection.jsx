import { useState } from "react"
import "./MovieSelection.css"
import Moviebox from "./components/Moviebox"
import Moviechip from "./components/Moviechip";
import { useNavigate } from "react-router-dom";
const MOVIES = [
    {
        id:0,
        movie:"Action",
        imgSrc:"Images/image 2.png",
        colorCode:"#FF5209"
    },
    {
        id:1,
        movie:"Drama",
        imgSrc:"Images/image 3.png",
        colorCode:"#D7A4FF"
    },
    {
        id:2,
        movie:"Romance",
        imgSrc:"Images/image 4.png",
        colorCode:"#148A08"
    },
    {
        id:3,
        movie:"Thriller",
        imgSrc:"Images/image 6.png",
        colorCode:"#84C2FF"
    },
    {
        id:4,
        movie:"Western",
        imgSrc:"Images/image 7.png",
        colorCode:"#902500"
    },
    {
        id:5,
        movie:"Horror",
        imgSrc:"Images/image 8.png",
        colorCode:"#7358FF"
    },
    {
        id:6,
        movie:"Fantasy",
        imgSrc:"Images/image 9.png",
        colorCode:"#FF4ADE"
    },
    {
        id:7,
        movie:"Music",
        imgSrc:"Images/image 10.png",
        colorCode:"#E61E32"
    },
    {
        id:8,
        movie:"Crime",
        imgSrc:"Images/image 11.png",
        colorCode:"#6CD061"
    },

]
function MovieSelection (){
    const navigate = useNavigate();
    const [SelectedMovies,setSelectedMovies] = useState([]);
    const handleMoveNext = () => {
        if(SelectedMovies.length < 3){
            alert("Plaese Select atleast 3 Movies category");
        }
        else{
            localStorage.setItem("SelectedMovies", JSON.stringify(SelectedMovies));
            setSelectedMovies([]);
            navigate("/Browse");
        }
        
    }
    return (
      <>
    <div className="mainMovieselection" style={{display:"flex"}}>
        <div className="leftsideMovieselection" style={{marginRight:"auto",marginLeft:"120px",marginTop:"8vh"}}>
            <div className="superappMovieselection">
                 Super App
            </div>
            <div className="chooseMovieselection">
                 Choose your<br></br>entertainment<br></br>category
            </div>
            <div className="SelectedmoviesMovieselection">
                {
                    SelectedMovies.map((category) => (
                    <Moviechip key = {category.id} category = {category} setSelectedMovies = {setSelectedMovies}/>
                    ))
                }
            </div>
            <div className="warningMovieselection">
                {
                    SelectedMovies.length < 3 && <p>&#9888; &nbsp; &nbsp;Minimum 3 Movies Required</p>
                }
            </div>
        </div>
        <div className="rightsideMovieselection" style={{marginRight:"80px",marginLeft:"auto",marginTop:"7vh",width:"55vw"}}>
            <div className="=categoryMovieselection" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",columnGap:"0px",rowGap:"20px"}}>
                {
                    MOVIES.map((category)=>(
                        <div key = {category.id} >
                        <Moviebox category={category} SelectedMovies={SelectedMovies} setSelectedMovies={setSelectedMovies}/>
                        </div>
                    ))
                }
            </div>
            <div className="bottomrightMovieselection" style={{display:"flex",justifyContent:"end",marginRight:"30px",marginTop:"30px"}}>
                    <button style={{backgroundColor:"#148A08",color:"white",fontFamily:"Roboto",height:"40px",width:"160px",borderRadius:"20px",fontSize:"20px",fontWeight:"350"}} onClick = {handleMoveNext}>Next Page</button>
            </div>
        </div>
    </div>
      </>
    )
}

export default MovieSelection;