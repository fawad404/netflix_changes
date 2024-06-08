import './listList.css'
import { DataGrid } from '@mui/x-data-grid'
import {DeleteOutline} from "@mui/icons-material"
import {useNavigate} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { deleteList ,getLists } from "../../context/listContext/apiCalls"
import { ListContext } from '../../context/listContext/ListContext'
export default function ListList() {
    const {lists, dispatch} = useContext(ListContext);
    const navigate = useNavigate();
    function goToProduct(params){
        navigate("/list/" + params.row._id, {state : {list: params.row}});
    }
    useEffect(() => {
        getLists(dispatch);
    }, [dispatch]);

    const handleDelete = (id)=>{
     deleteList(id, dispatch);
    };

    //console.log(movies);

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'title', headerName: 'title', width: 250 },
        { field: 'genre', headerName: 'Genre', width: 150 },
        { field: 'type', headerName: 'type', width: 150 },
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
        rows={lists}
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


