import { useContext } from "react"
import "./topbar.css"
import {Language, NotificationsNone, Settings} from '@mui/icons-material'
import { AuthContext } from "../../context/authContext/AuthContext"
import { logout } from "../../context/authContext/apiCalls";
export default function Topbar() {
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleLogout = (e) => {
        e.preventDefault();
        logout(dispatch);
    };
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Fawadadmin</span>
                    <button 
                className="loginButton" 
                onClick={handleLogout} 
                disabled={isFetching}
                >
                    Logout
                    </button>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                    </div>
                    <img src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="topAvator" />
                </div>
            </div>
        </div>
    )
}
