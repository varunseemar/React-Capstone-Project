import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import "./Info.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
function Info (){
    const [notes,setNotes] = useState(localStorage.getItem('notes') || '');
    const [news,setNews] = useState(null);
    const [weather,setWeather] = useState();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const SelectedMovies = JSON.parse(localStorage.getItem('SelectedMovies'));
    const [toggle,setToggle] = useState(false);
    const [isPlaying,setIsPlaying] = useState(false)
    const [time,setTime] = useState(0)
    const [remainingHour,setRemainingHour] = useState();
    const [remainingMin,setRemainingMin] = useState();
    const [remainingSec,setRemainingSec] = useState();
    const navigate = useNavigate();
    const updateNotes = (e) => {
        setNotes(e.target.value);
        localStorage.setItem('notes',JSON.stringify(e.target.value))
    }
    useEffect(()=>{
        fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json')
        .then(
           response=>response.json()
        )
        .then(
           data => setNews(data.articles[Math.floor(Math.random() * data.articles.length | 1 )])
        )
        .catch((e)=>{
            console.log("hey")
        })
    },[])
    useEffect(()=>{
        fetch('https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=qmJYDzkneyhSmv9ACBwIjOsy1lPOeJ48')
        .then(
           response=>response.json()
        )
        .then(
          data => setWeather(data.timelines.daily[0].values)
        )
        .catch((e)=>{
            console.log("hey")
        })
    },[])
   
    const date  = Date.now();
    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth()+1
    const day = new Date(date).getDate()
    const hours = new Date(date).getHours()
    const min = new Date(date).getMinutes()
    const sec = new Date(date).getSeconds()
    useEffect(()=>{
        console.log("rerendered")
        const intervalId = setInterval(()=>{
            setToggle(!toggle)
        },1000)

        return()=>{
            clearInterval(intervalId);
            console.log("unmounted")
        }
            
    },[])

    const handleTimer = ((operation,value)=>{
        if(operation === 1){
            setTime((time)=>time + value)
        }
        else{
            setTime((time)=>{
                if(time - value < 0 ){
                    return 0;
                }
                else{
                    return time - value;
                }
            })
        }
    })

    const formatTime = (time)=>{
        const hours = Math.floor(time / 3600)
        const min = Math.floor((time % 3600)/60) 
        const sec = time % 60
        setRemainingHour(hours);
        setRemainingMin(min);
        setRemainingSec(sec);
        return <div style={{color:"white",fontSize:"35px"}}>{hours < 10 ? "0" + hours : hours}:{min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}</div>
    }

    const navigateHandler = ()=>{
        navigate("/Browse");
    }

    return (
        <>
        <div>
            <div className='userinfo' style={{display:"grid"}}>
                <div className='userselectioninfo'>
                    <img src="Images/image 15.png" alt="userimageinfo" style={{height:"190px", width:"85px",marginTop:"22px",marginLeft:"15px"}}></img>
                    <div className='usercontentinfo' style={{float:"right",marginRight:"40px",marginTop:"10px",marginLeft:"25px"}}>
                        {userData ? <>
                        <p style={{fontSize:"15px",marginBottom:"0px"}}>{userData.name}</p>
                        <p style={{fontSize:"15px",marginBottom:"5px"}}>{userData.email}</p>
                        <p style={{fontSize:"23px",marginBottom:"15px",marginTop:"8px"}}>{userData.userName}</p>
                        </>:"No User Data"}

                        {SelectedMovies ? <div className='buttonmovieselectioninfo' style={{display:"inline-grid", gridTemplateColumns:"repeat(2,1fr)",gap:"5px"}}>
                        {
                        SelectedMovies.map((movie,index)=> <button style={{marginLeft:"0px",marginBottom:"10px",backgroundColor:"#9F94FF",height:"30px",width:"120px",borderRadius:"20px",color:"white",fontFamily:"Roboto",fontSize:"15px",fontWeight:"350"}}key={index}>{movie.movie}</button>  
                        )}
                        </div>:"No Selected Movies"}
                    </div>
                </div>
                <div className='notesinfo'>
                <textarea style={{minHeight:"315px",maxHeight:"3150px",minWidth:"350px",maxWidth:"350px",padding:"40px",backgroundColor:"#F1C75B",borderRadius:"20px",fontFamily:"Roboto",fontSize:"20px",paddingTop:"70px"}} value={notes} onChange={updateNotes}>

                </textarea>
                </div>

                {news ? <div className='newsinfo' style={{backgroundColor:"white"}}>
                    <img src={news.urlToImage} style={{height:"330px",width:"360px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px"}}alt={news.title}></img>
                    <p style={{fontSize:"18px",fontWeight:"500"}}>{news.title}</p>
                    <p>{news.description}</p>
                    <p>{news.content.split("[")[0]}</p>
                </div> : "No News"}
                
                <div className='weatherinfo' style={{display:"flex",flexDirection:"column",marginTop:"20px"}}>
                    <div className='weathertimeinfo' style={{backgroundColor:"#FF4ADE",borderTopLeftRadius:"20px",borderTopRightRadius:"20px"}}>
                        <p style={{display:"inline-grid",marginLeft:"80px"}}>{day < 10 ? "0" + day : day}-{month < 10 ? "0" + month : month}-{year}</p> 
                        <p style={{display:"inline-grid",marginLeft:"85px"}}>{hours > 12 ? hours - 12 : hours }:{min < 10 ? "0" + min : min}{hours >= 12 ? "PM":"AM"}</p>
                    </div>
                    {weather ? <div className='weatherattributesinfo' style={{backgroundColor:"#101744",display:"flex",height:"75px"}}>
                    <img style={{display:"inline-grid",marginLeft:"30px",marginTop:"10px",height:"70px"}} src="Images/rain.png" alt="weather"></img>
                    <img style={{display:"inline-grid",marginLeft:"45px",height:"60px",marginTop:"20px"}} src="Images/Line.png" alt="line"></img>
                    <p style={{display:"inline-grid",marginLeft:"40px",fontSize:"30px",color:"white",float:"top"}}>{weather.temperatureAvg}&deg;C</p>
                    <img style={{display:"inline-grid",marginLeft:"45px",height:"60px",marginTop:"20px"}} src="Images/Line.png" alt="line"></img>
                    <img style={{display:"inline-grid",marginLeft:"20px",height:"20px",marginTop:"20px"}} src="Images/wind.png" alt="wind"></img>
                    <p style={{display:"inline-grid",color:"white",marginLeft:"5px",marginTop:"15px",fontSize:"12px"}}>{weather.windSpeedAvg}&nbsp;&nbsp;Km/h Wind</p>
                    </div>:"No Weather"}
                    {weather ? <div style={{display:"flex",flexDirection:"row",backgroundColor:"#101744",height:"40px",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}}>
                        <p style={{display:"inline-grid",color:"white",marginLeft:"30px",marginTop:"0px"}}>Heavy Rain</p>
                        <img style={{display:"inline-grid",marginLeft:"90px",height:"20px",marginTop:"0px"}} src="Images/temp.png"></img>
                        <p style={{display:"inline-grid",color:"white",marginLeft:"5px",marginTop:"0px",fontSize:"13px"}}>{weather.pressureSurfaceLevelAvg}&nbsp;mbar&nbsp;<br></br>Pressure</p>
                        <img style={{display:"inline-grid",height:"20px",marginLeft:"75px",marginTop:"0px"}} src="Images/drop.png"></img>
                        <p style={{display:"inline-grid",marginTop:"0px",color:"white",fontSize:"13px",marginLeft:"10px"}}>{weather.humidityAvg}%&nbsp;<br></br>Humidity</p>
                    </div>:"No weather"}
                </div>
                <div className='timerinfo' style={{display:"flex"}}>
                    <div className='countdowninfo' style={{margin:"15px 240px 15px 50px"}}>
                        <CountdownCircleTimer
                            isPlaying={isPlaying}
                            duration={time}
                            colors={['#FF6A6A']}
                        >
                        {({ remainingTime }) => formatTime(remainingTime)}
                        </CountdownCircleTimer>
                    </div>
                    <div className='timeinfo'>
                        <div className='timeheadinginfo'>
                            <p style={{display:"inline-grid",marginRight:"70px"}}>Hours</p>
                            <p style={{display:"inline-grid",marginRight:"70px"}}>Minutes</p>
                            <p style={{display:"inline-grid"}}>Seconds</p>
                        </div>
                        <div style={{marginTop:"0px"}}>
                            <img src="Images/Vector.png" onClick={()=>handleTimer(1,3600)} style={{display:"inline-grid",marginRight:"105px",marginLeft:"17px"}}></img>
                            <img src="Images/Vector.png" onClick={()=>handleTimer(1,60)} style={{display:"inline-grid",marginRight:"115px"}}></img>
                            <img src="Images/Vector.png" onClick={()=>handleTimer(1,1)} style={{display:"inline-grid",marginRight:"70px"}}></img>
                        </div>
                        <div className='remainingtimerinfo' style={{marginTop:"0px",marginBottom:"10px",maxHeight:"50px",display:"flex",alignItems:"center"}}>
                            <p style={{display:"inline-grid",marginLeft:"10px"}}>{remainingHour < 10 ? "0" + remainingHour : remainingHour}</p>
                            <p style={{display:"inline-grid",marginLeft:"50px"}}>:</p>
                            <p style={{display:"inline-grid",marginLeft:"30px"}}>{remainingMin < 10 ? "0" + remainingMin : remainingMin}</p>
                            <p style={{display:"inline-grid",marginLeft:"50px"}}>:</p>
                            <p style={{display:"inline-grid",marginLeft:"43px"}}>{remainingSec < 10 ? "0" + remainingSec : remainingSec}</p>
                        </div>
                        <div style={{marginTop:"0px"}}>
                            <img src="Images/Vectori.png" onClick={()=>handleTimer(0,3600)} style={{display:"inline-grid",marginRight:"105px",marginLeft:"17px"}}></img>
                            <img src="Images/Vectori.png" onClick={()=>handleTimer(0,60)} style={{display:"inline-grid",marginRight:"115px"}}></img>
                            <img src="Images/Vectori.png" onClick={()=>handleTimer(0,1)} style={{display:"inline-grid",marginRight:"70px"}}></img>
                        </div>
                        <button className="starttimer" style={{backgroundColor:"#FF6A6A",fontFamily:"Roboto",fontSize:"20px",color:"white",width:"350px",borderRadius:"20px",marginTop:"5px"}}onClick={()=>setIsPlaying(true)}>Start</button>
                    </div>
                </div>
            </div>
            <div>
                <button style={{float:"right",marginTop:"20px",marginRight:"80px",height:"40px",width:"120px",backgroundColor:"#148A08",color:"white",borderRadius:"20px",fontFamily:"Roboto",fontSize:"17px"}} onClick={navigateHandler}>Browse</button>
            </div>
        </div>
        </>
    )
}

export default Info;