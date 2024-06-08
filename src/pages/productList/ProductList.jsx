import './ProductList.css'
import { DataGrid } from '@mui/x-data-grid'
import {DeleteOutline} from "@mui/icons-material"
import { productRows } from '../../dummydata'
import {Link, useNavigate} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls"
import { MovieContext } from '../../context/movieContext/MovieContext'
export default function ProductList() {
    const {movies, dispatch} = useContext(MovieContext);
    const navigate = useNavigate();
    function goToProduct(params){
        navigate("/product/" + params.row._id, {state : {movie: params.row}});
    }
    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);
    const handleDelete = (id)=>{
        deleteMovie(id, dispatch);
    };

    //console.log(movies);

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'movie', 
        headerName: 'Movie', 
        width: 200, 
        renderCell: (params)=>{
            return (
                <div className='productListItem'>
                    <img className='productListImg' src={params.row.img} alt="" />
                    {params.row.title}
                </div>
            )
        } },
        { field: 'genre', headerName: 'Genre', width: 120 },
        { field: 'year', headerName: 'Year', width: 120 },
        { field: 'limit', headerName: 'Limit', width: 120 },
        { field: 'isSeries', headerName: 'IsSeries', width: 120 },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params)=>{
                return(
                    <>

                    <button onClick={()=>goToProduct(params)} className="productListEdit">Edit</button>
                    
                     <DeleteOutline className="productListDelete" onClick={()=>handleDelete(params.row._id)}/>
                     </>
                )
            }
        },
      ];
    return (
        <div className='productList'>
            <DataGrid
        rows={movies}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(r) => r._id}
      />
        </div>
    )
}


