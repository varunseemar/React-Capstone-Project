export default function Moviechip({category , setSelectedMovies}){
    const handleRemove = (category) => {
        setSelectedMovies((SelectedMovies) => SelectedMovies.filter((item)=>item !== category))
    }
    
    return(
        <button style={{marginInline:"10px",marginBottom:"20px",backgroundColor:"#148A08",height:"40px",width:"160px",borderRadius:"20px",color:"white",fontFamily:"Roboto",fontSize:"20px",fontWeight:"350"}}> {category.movie} &nbsp;&nbsp;&nbsp;&nbsp;<span onClick={()=>handleRemove(category)}>X</span></button>
    )
}