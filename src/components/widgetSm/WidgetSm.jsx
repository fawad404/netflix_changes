import { useEffect, useState } from 'react'
import './widgetSm.css'
import {Visibility} from "@mui/icons-material"
import axios from 'axios';
export default function WidgetSm() {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try{
                const res = await axios.get("http://localhost:8800/api/user?new=true", {
                    headers : {
                        token:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTQyNGNkNTRmNjdlNmNiZWRiMGNjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNjIwMTc0OSwiZXhwIjoxNzA2NjMzNzQ5fQ.SIjbqOnhc9FwULqvGQ8YVMKjGW6m5F1nefy5p3tkKR0"
                    },
                });
                setNewUsers(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getNewUsers();
    },[]);
    return (
        <div className='widgetSm'>
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUsers.map(user=>(

                    <li className="widgetSmListItem">
                    <img src={user.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"} 
                    alt="" 
                    className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{user.username}</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className='widgetSmIcon'/>
                        Display
                    </button>
                </li>
                    ))}
            </ul>
        </div>
    )
}


