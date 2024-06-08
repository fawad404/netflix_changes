import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getlistsFailure, getlistsStart, getlistsSuccess, updateListFailure, updateListStart, updateListSuccess } from "./ListActions";
import axios from "axios"

export const getLists = async (dispatch) => {
    dispatch(getlistsStart());
    try{
        const res = await axios.get("http://localhost:8800/api/lists", {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
        });
        dispatch(getlistsSuccess(res.data));
    }catch(err){
        dispatch(getlistsFailure());
    }
};

// //create
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try{
       const res = await axios.post("http://localhost:8800/api/lists", list, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
        });
        dispatch(createListSuccess(res.data));
    }catch(err){
        dispatch(createListFailure());
    }
};

// //update
export const updateList = async (list, dispatch) => {
    dispatch(updateListStart());
    try{
       const res = await axios.put("http://localhost:8800/api/lists/"+list.id, list, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
        });
        dispatch(updateListSuccess(res.data));
    }catch(err){
        dispatch(updateListFailure());
    }
};


// //delete
export const deleteList = async (id,dispatch) => {
    dispatch(deleteListStart());
    try{
        await axios.delete("http://localhost:8800/api/lists/"+ id, {
            headers: { 
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
        });
        dispatch(deleteListSuccess(id));
    }catch(err){
        dispatch(deleteListFailure());
    }
};