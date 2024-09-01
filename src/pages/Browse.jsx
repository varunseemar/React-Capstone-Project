import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Browse.css"

function Browse() {
    const [genreList, setGenreList] = useState([]);
    const [movies, setMovies] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchGenres = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDQ4ZjNhNjliZWJiYTFjYWJmM2Q4YTdkMjU4YmQ2ZiIsIm5iZiI6MTcyMjU2NTc4MS42MDM0ODcsInN1YiI6IjY2YWM0MmE1NzZjOGQ1ZDdiZGY1MmE0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mtAVktIQ6YQyZDUQwBGSPkG0KpMgg2AWYPHQmkWOXFY'
                }
            };

            const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            const data = await res.json();
            setGenreList(data.genres);
            
        }

        fetchGenres();
    }, [])
    
    useEffect(() => {
        if (genreList.length > 0) {
            let genreToBeFetched = [];
            userSelectedGenres.forEach(genre => {
                genreToBeFetched.push(genreList.find((item) => item.name === genre.movie))
            });
            //console.log(genreToBeFetched,"fetch")
            const fetchMovies = async () => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDQ4ZjNhNjliZWJiYTFjYWJmM2Q4YTdkMjU4YmQ2ZiIsIm5iZiI6MTcyMzc1MjA2My4zOTM5Niwic3ViIjoiNjZhYzQyYTU3NmM4ZDVkN2JkZjUyYTRlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.S8i4AiAw-qbDxFz-pAgWJyEcKjZBblPk3EOlCkctd2I'
                    }
                };
                
                const idArray = genreToBeFetched.map((item) => item.id);
                idArray.join('%2C');
                const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${idArray}`, options)
                const data = await res.json();
                setMovies(data.results);
            }
            fetchMovies();
           }
    }, [genreList])

    const userSelectedGenres = JSON.parse(localStorage.getItem("SelectedMovies"))

    const handleNavigateToUser = ()=>{
        navigate("/Info");
    }

    return (
        <>
            <div className="mainBrowse">
                <div className="superappBrowse">
                    Super App
                    <img src="Images\image 14.png" alt="user" style={{display:"flex",marginLeft:"auto",marginRight:"7vh",height:"65px",width:"65px"}} onClick={handleNavigateToUser}></img>
                </div>
                <div className="headingBrowse">Entertainment according to your choice</div>
                
                {movies === null ? "loading.....":
                movies.map((movie,index)=>{
                    if(index >= 4 * userSelectedGenres.length){
                        return null;
                    }
                    return <>
                    {index % 4 === 0 ? <div className="movieTitleBrowse">{userSelectedGenres[index/4].movie}</div> : null}
                    <div className="movieImageBrowse" key={movie.id} style={{display:"inline-grid",gridTemplateColumns:"1fr,1fr,1fr,1fr",marginInline:"50px",marginInlineStart:"90px"}}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{width:"235px",height:"125px",borderRadius:"8px"}} alt={movie.title} title={movie.title}></img>
                        
                    </div>
                    </>
                    
                })
                }
            </div>
        </>
    )
}

export default Browse;