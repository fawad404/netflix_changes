import { useEffect, useState } from 'react'
import './newProduct.css'
import {
    ref,
    uploadBytes,
    uploadBytesResumable,
    listAll,
    getDownloadURL,
  } from "firebase/storage";
  import { storage } from "../../firebase";
  import { v4 } from "uuid";
export default function NewProduct() {

    const [movie, setMovie] = useState(null);
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const [progress, setProgress] = useState(0);
    const [label, setLabel] = useState("");

    const handleChange = (e) =>{
        const value = e.target.value;
        setMovie({...movie, [e.target.name]:value});
    }
    //console.log(img);

    const upload = (items) => {
        items.forEach((item)=> {
            const storageRef = ref(storage, `images/${item.file.name + v4()}`);
            //const uploadTask = storage.ref(`/items/${item.files.name}`).put(item);
            

            const uploadTask = uploadBytesResumable(storageRef, item.file);
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progresss = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    setProgress(progresss);
    setLabel(item.label);
    console.log('Upload is ' + progresss + '% done and file is:' + item.label);
    
    // switch (snapshot.state) {
    //   case 'paused':
    //     console.log('Upload is paused');
    //     break;
    //   case 'running':
    //     console.log('Upload is running');
    //     break;
    // }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
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
            {file : img, label: "img"},
            {file : imgTitle, label: "imgTitle"},
            {file : imgSm, label: "imgSm"},
            {file : trailer, label: "trailer"},
            {file : video, label: "video"},
        ]);
    };

    console.log(movie);

  
    return (
        <div className='newProduct'>
            <h1 className="addProductTitle">New Movie</h1>
                    <div className="progress-bar" role="progressbar" 
                    aria-valuenow={progress}
                    style={{'--progress-value' : progress}}
                     aria-valuemin="0" aria-valuemax="100"></div>
                    <span className='progress-barspan'>{label} is Uploading</span>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" 
                    id='img' 
                    name='img' 
                    onChange={(e) => setImg(e.target.files[0])}/>

                </div>
                <div className="addProductItem">
                    <label>Title image</label>
                    <input type="file" 
                    id='imgTitle' 
                    name='imgTitle'
                    onChange={(e) => setImgTitle(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Thumbnail image</label>
                    <input type="file" 
                    id='imgSm' 
                    name='imgSm'
                    onChange={(e) => setImgSm(e.target.files[0])}
                    />
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
                    <input type="file" 
                    name='trailer'
                    onChange={(e) => setTrailer(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Video</label>
                    <input type="file" 
                    name='video'
                    onChange={(e) => setVideo(e.target.files[0])}
                    />
                </div>{uploaded === 5 ? (
                    <button className="addProductButton">Create</button>
                    ) : (
                    <button className="addProductButton"
                     onClick={handleUpload}
                     
                    >Upload</button>

                    )}
            </form>
        </div>
    )
} 


