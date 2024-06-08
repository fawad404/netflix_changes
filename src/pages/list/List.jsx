import './list.css'
import {Link, useLocation} from 'react-router-dom'
import {Publish} from '@mui/icons-material'
import { useContext, useState } from 'react';
import { updateList } from '../../context/listContext/apiCalls';
import {ListContext} from "../../context/listContext/ListContext"

export default function List() {
    const location = useLocation();
    const list = location.state.list;
    console.log(location.state.list);
    const id = list._id;
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [genre, setGenre] = useState("");
    const {dispatch} = useContext(ListContext);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateList({
            id,
            title,
            type,
            genre,
        }, dispatch);
    };
    return (
        <div className='product'>
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to='/newList'>
                <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{list.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{list.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">{list.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input type="text" 
                        placeholder={list.title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Type</label>
                        <input type="text" 
                        placeholder={list.type}
                        onChange={(e) => setType(e.target.value)}
                        />
                        <label>Genre</label>
                        <input type="text" 
                        placeholder={list.genre}
                        onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <div className="productFormRight">
                        <button className="productButton"
                        onClick={handleUpdate}
                        >Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


