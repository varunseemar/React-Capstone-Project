function Moviebox({category , SelectedMovies , setSelectedMovies}){
    const handleSelection = (category) => {
        if(SelectedMovies.includes(category)){
            setSelectedMovies(SelectedMovies.filter((item) =>  item !== category))
        }
        else{
            setSelectedMovies([...SelectedMovies , category])
        }
        
    }
    
    return(
       
        <div  style={{width:"190px",height:"190px",display:"flex",flexDirection:"column",backgroundColor:`${category.colorCode}`,border: `4px solid ${SelectedMovies.includes(category) ? "#11B800":"black" }`,borderRadius:"20px"}}
    
        onClick={() => handleSelection(category)} >
            <div style={{display:"flex",alignItems:"flex-start",marginLeft:"13px"}}>
                <h1 style={{color:"#FFFFFF",fontFamily:"sans-serif",fontSize:"28px",fontWeight:"450"}}>{category.movie}</h1>
            </div>
            <div>
                <img src={category.imgSrc} style={{height:"100px",display:"flex",alignItems:"end",objectFit:"contain",marginLeft:"8.5px"}}></img>
            </div>
            
        </div>
       
    )
}

export default Moviebox;