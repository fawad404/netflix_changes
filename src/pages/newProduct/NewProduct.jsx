import { useContext, useEffect, useState } from 'react'
import './newProduct.css'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { MovieContext } from "../../context/movieContext/MovieContext"
import { createMovie } from '../../context/movieContext/apiCalls';

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const {dispatch} = useContext(MovieContext);

  // State for individual progress bars
  const [progressBars, setProgressBars] = useState({
    img: { label: "Image", progress: 0 },
    imgTitle: { label: "Title Image", progress: 0 },
    imgSm: { label: "Thumbnail Image", progress: 0 },
    trailer: { label: "Trailer", progress: 0 },
    video: { label: "Video", progress: 0 },
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  }

  const upload = (items) => {
    items.forEach((item) => {
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
            setMovie((prev) => {
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
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };

  const renderProgressBar = (key) => (
    <div className="progress-bar" key={key} role="progressbar"
      aria-valuenow={progressBars[key].progress}
      style={{ '--progress-value': progressBars[key].progress }}
      aria-valuemin="0" aria-valuemax="100">
    </div>
  );
  
  console.log(movie);
  return (
    <div className='newProduct'>
      <h1 className="addProductTitle">New Movie</h1>
       <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <div className="top">
                    <input type="file" 
                    id='img' 
                    name='img' 
                    onChange={(e) => setImg(e.target.files[0])}/>
                    {progressBars.img.progress > 0 && renderProgressBar("img")}
                    </div>
                </div>
                <div className="addProductItem">
                    <label>Title image</label>
                    <div className="top">
                    <input type="file" 
                    id='imgTitle' 
                    name='imgTitle'
                    onChange={(e) => setImgTitle(e.target.files[0])}
                    />
                    { progressBars.imgTitle.progress > 0 && renderProgressBar("imgTitle")}
                    </div>
                </div>
                <div className="addProductItem">
                    <label>Thumbnail image</label>
                    <div className="top">
                    <input type="file" 
                    id='imgSm' 
                    name='imgSm'
                    onChange={(e) => setImgSm(e.target.files[0])}
                    />
                    { progressBars.imgSm.progress > 0 && renderProgressBar("imgSm")}
                    </div>
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input type="text" placeholder='John Wick' name='title' onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input type="text" placeholder='description' name='desc' onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Year</label>
                    <input type="text" placeholder='year' name='year' onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input type="text" placeholder='genre' name='genre' onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Duration</label>
                    <input type="text" placeholder='duration' name='duration' onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Limit</label>
                    <input type="text" placeholder='limit' name='limit' onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Is Series?</label>
                    <select name="isSeries" id="isSeries" onChange={handleChange}>
                        <option value="false">No</option>
                        <option value="true">yes</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Trailer</label>
                <div className="top">
                    <input type="file" 
                    name='trailer'
                    onChange={(e) => setTrailer(e.target.files[0])}
                    />
                    {progressBars.trailer.progress > 0 && renderProgressBar("trailer")}
                    </div>
                </div>
                <div className="addProductItem">
                    <label>Video</label>
                <div className="top">
                    <input type="file" 
                    name='video'
                    onChange={(e) => setVideo(e.target.files[0])}
                    />
                    {progressBars.video.progress > 0 && renderProgressBar("video")}
                    </div>
                </div>{uploaded === 5 ? (
                    <button className="addProductButton"
                    onClick={handleSubmit}
                    >Create</button>
                    ) : (
                    <button className="addProductButton"
                     onClick={handleUpload}
                     
                    >Upload</button>

                    )}
            </form>
    </div>
  )
}
