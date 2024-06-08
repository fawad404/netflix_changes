import './user.css'
import { LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from 'react-router-dom'
export default function User() {
    return (
        <div className='user'>
         <div className="userTitleContainer">
            <h1 className='userTitle'>Edit user</h1>
            <Link to="/newUser">
            <button className="userAddButton">Create</button>
            </Link>
         </div>
         <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src="https://images.pexels.com/photos/19055796/pexels-photo-19055796/free-photo-of-brunette-in-leather-jacket-posing-at-subway-station.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" 
                    className="userShowImg" />
                    <div className="userShowTopTitle">
                    <span className="userShowUsername">Hamza Dev</span>
                    <span className="userShowUserTitle">Web Dveloper</span>
                    </div>

                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Accout Details</span>
                    <div className="userShowInfo">
                    <PermIdentity className='userShowIcon'/>
                    <span className="userShowInfoTitle">FawaBech99</span>
                    </div> 
                    <div className="userShowInfo">
                    <CalendarTodayIcon className='userShowIcon'/>
                    <span className="userShowInfoTitle">14.11.2002</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                    <PhoneAndroid className='userShowIcon'/>
                    <span className="userShowInfoTitle">+1 123 456 67</span>
                    </div>
                    <div className="userShowInfo">
                    <MailOutline className='userShowIcon'/>
                    <span className="userShowInfoTitle">fawad@gmail.com</span>
                    </div>
                    <div className="userShowInfo">
                    <LocationSearching className='userShowIcon'/>
                    <span className="userShowInfoTitle">Faisalabad || Pakistan </span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input type="text" placeholder='FawaBech99' className='userUpdateInput'/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input type="text" placeholder='Hamza Dev' className='userUpdateInput'/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="text" placeholder='fawad@gmail.com' className='userUpdateInput'/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" placeholder='+1 123 456 67' className='userUpdateInput'/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input type="text" placeholder='Faisalabad || Pakistan' className='userUpdateInput'/>
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img className='userUpdateImg' src="https://images.pexels.com/photos/17565787/pexels-photo-17565787/free-photo-of-brunette-by-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                            <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
                            <input type="file" id='file' style={{display: "none"}}/>
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
         </div>
        </div>
    )
}

User
