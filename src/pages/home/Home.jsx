import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Chart from '../../components/chart/Chart'
import './home.css'
import {userData} from "../../dummydata"
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { useEffect, useMemo, useState } from "react";
import axios from 'axios'
export default function Home() {
    const MONTHS = useMemo(
        () => [
    
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
        ); 
    
      const [ userStats, setUserStats] = useState([]);
    
      useEffect(()=>{
        const getStats = async () => {
          try{
            const res = await axios.get("http://localhost:8800/api/user/stats", {
              headers:{
                token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTQyNGNkNTRmNjdlNmNiZWRiMGNjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNjIwMTc0OSwiZXhwIjoxNzA2NjMzNzQ5fQ.SIjbqOnhc9FwULqvGQ8YVMKjGW6m5F1nefy5p3tkKR0"
              },
            });
            const statsList = res.data.sort(function (a, b) {
                return a._id - b._id;
            });
            statsList.map((item) => 
              setUserStats((prev)=>[
                ...prev,
                { name: MONTHS[item._id - 1], "New User": item.total },
              ])
              );
          }catch(err){
            console.log(err);
          }
          };
          getStats();
      },[MONTHS]);
      console.log(userStats);
    return (
        <div className='home'>
            <FeaturedInfo/>
            <Chart data={userStats} 
            title="User Analytics" 
            dataKey="New User" grid/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}


