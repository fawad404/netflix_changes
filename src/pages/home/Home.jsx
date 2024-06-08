import { useEffect, useState } from 'react'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import Navbar from '../../components/navbar/Navbar'
import './home.scss'
import axios from 'axios'
export default function Home({type}) {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(()=>{
        const getRandomLists = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/api/lists`, {
                    params: {
                      type: type || undefined,
                      genre: genre || undefined,
                    },
                    headers: {
                      token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTQyNGNkNTRmNjdlNmNiZWRiMGNjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNjIwMTc0OSwiZXhwIjoxNzA2NjMzNzQ5fQ.SIjbqOnhc9FwULqvGQ8YVMKjGW6m5F1nefy5p3tkKR0",
                    },
                  });          
              //  console.log(res.data);
                setLists(res.data);
            }catch(err){
                console.log(err)
            }
        };
        getRandomLists();
    },[type, genre]);
   // console.log(lists);
    return (
        <div className='home'>
          <Navbar/>
          <Featured  type={type} setGenre={setGenre} />
          {lists.map((list) => (
              <List key={list._id} list={list}/>      
          ))}
         </div>
    )
}


