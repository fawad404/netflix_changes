import './product.css'
import {Link, useLocation} from 'react-router-dom'
import {Publish} from '@mui/icons-material'
import { useContext, useState } from 'react';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import { storage } from "../../firebase";
  import { v4 } from "uuid";
  import { MovieContext } from "../../context/movieContext/MovieContext"
import { updateMovie } from '../../context/movieContext/apiCalls';
export default function Product() {
    const location = useLocation();
    const movie = location.state.movie;
    //console.log(location.state.movie);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [img, setImg] = useState(null);
    const [updatedMovie, setUpdatedMovie] = useState({
        _id: movie._id,
        title: null,
        year: null,
        genre: null,
        limit: null,
    });
    const [uploaded, setUploaded] = useState(0);

    const {dispatch} = useContext(MovieContext);

    const [progressBars, setProgressBars] = useState({
        img: { label: "Image", progress: 0 },
        trailer: { label: "Trailer", progress: 0 },
        video: { label: "Video", progress: 0 },
      });

      const renderProgressBar = (key) => (
        <div className="progress-bar" key={key} role="progressbar"
          aria-valuenow={progressBars[key].progress}
          style={{ '--progress-value': progressBars[key].progress }}
          aria-valuemin="0" aria-valuemax="100">
        </div>
      );
    //const id = movie._id;
    // setUpdatedMovie({...updatedMovie, ["._id"] : movie._id});
    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
    }
    const upload = (items) => {
        items.forEach((item) => {

            // console.log(item);
            // setUploaded((prev) => prev + 1);
          const storageRef = ref(storage, `images/${item.file.name + v4()}`);
    
          const uploadTask = uploadBytesResumable(storageRef, item.file);
    
          uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressBars(prevProgressBars => ({
                  ...prevProgressBars,
                  [item.label]: { ...prevProgressBars[item.label], progress },
                }));
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUpdatedMovie((prev) => {
                  return { ...prev, [item.label]: downloadURL };
                });
                setUploaded((prev) => prev + 1);
              });
            }
          );
        });
      };
    
      const handleUpload = (e) => {
        e.preventDefault();
        upload([
          { file: img, label: "img" },
          { file: trailer, label: "trailer" },
          { file: video, label: "video" },
        ]);
      };
    const handleSubmit = (e) => {
        e.preventDefault();

         console.log(updatedMovie);
        // console.log(id);
        updateMovie(updatedMovie, dispatch);

    }
    return (
  
            <div className='product'>
            <div className="productTitleContainer">
            <h1 className="productTitle">Movie</h1>
            <Link to='/newproduct'>
                <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        
                        <img src={movie.img} 
                        alt="" 
                        className="productInfoImg" />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input type="text" 
                        placeholder={movie.title}
                        name='title'
                        onChange={handleChange}
                        />
                        <label>Year</label>
                        <input type="text" placeholder={movie.year}
                        name='year'
                        onChange={handleChange}
                        />
                        <label>Genre</label>
                        <input type="text" placeholder={movie.genre}
                        name='genre'
                        onChange={handleChange}
                        />
                        <label>Limit</label>
                        <input type="text" placeholder={movie.limit}
                        name='limit'
                        onChange={handleChange}
                        />
                        <label>Trailer</label>
                        <div className="top">
                        <input type="file" placeholder={movie.trailer}
                        onChange={(e)=> {setTrailer(e.target.files[0])}}
                        />
                        { progressBars.trailer.progress > 0 && renderProgressBar("trailer")}
                        </div>
                        <label>Video</label>
                        <div className="top">
                        <input type="file" placeholder={movie.video}
                        onChange={(e)=> {setVideo(e.target.files[0])}}
                        />
                        { progressBars.video.progress > 0 && renderProgressBar("video")}
                        </div>

                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <div className="top">

                                { progressBars.img.progress > 0 && renderProgressBar("img")}
                            <img src={movie.img}
                            alt="" 
                            style={{marginLeft: "25px"}}
                            className="productUploadImg" 
                            />
                            </div>
                            <label for="file">
                                <Publish/>
                            </label>
                            <input type="file" id='file' 
                            style={{display: "none"}}
                            onChange={(e)=> {setImg(e.target.files[0])}}
                            />
                        </div>
                        {uploaded === 3 ? (
                        <button className="productButton"
                        onClick={handleSubmit}
                        >Create</button>
                        ) : (
                        <button className="productButton"
                        onClick={handleUpload}
                        >Update</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}


