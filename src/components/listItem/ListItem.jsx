import { useEffect, useState } from 'react'
import './listItem.scss'
import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
export default function ListItem({index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});
    const navigate = useNavigate();

    function goToWatch(){
        navigate("/watch", {state : {movie: movie.video}});
    }
    //console.log(item);
    useEffect(()=>{
        const getMovie = async ()=> {
            try{
                const res = await axios.get("http://localhost:8800/api/movies/find/"+item, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTQyNGNkNTRmNjdlNmNiZWRiMGNjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNjIwMTc0OSwiZXhwIjoxNzA2NjMzNzQ5fQ.SIjbqOnhc9FwULqvGQ8YVMKjGW6m5F1nefy5p3tkKR0",
                      },
                });
                
                setMovie(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getMovie();
    },[item]);
     return (
        
        
        
        <div className='listItem'
        style={{left : isHovered && index * 255 - 35 + index * 2.5 }}
         onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
        onClick={goToWatch}
        >
                 <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
                <div className="icons">
                    <PlayArrow className='icon'/>
                    <Add className='icon'/>
                    <ThumbUpAltOutlined className='icon'/>
                    <ThumbDownOutlined className='icon'/>
                </div>
                <div className="itemInfoTop">
                    <span>{movie.duration}</span>
                    <span className='limit'>+{movie.limit}</span>
                    <span>{movie.year}</span>
                </div>
                <div className="desc">
                   {movie.desc}
                </div>
                <div className="genre">{movie.genre}</div>
            </div></>
        )}
        </div>
       
    );
}


