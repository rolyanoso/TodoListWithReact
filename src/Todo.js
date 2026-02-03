import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

//ICONS
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';



//CONTEXTS
import { useTodos } from './contexts/myContext';
import { useToast } from './contexts/toastContext';




export default function Todo({todo,showDelete,showUpdate}) {
    const {todos,dispatch} = useTodos()
    const {showHideToast} = useToast();
    function onchangeClick(){
        handleChange(todo.id)
    }
    function handleChange(){
        dispatch({
            type:"toggleCompleted",
            payload:{id:todo.id}
        });
        showHideToast("Değişiklikler başarıyla kaydedildi")
    }
    function handleDelete(){
        showDelete(todo)
    }
    function handleUpdate(){
        showUpdate(todo,todo.title,todo.detail)
    }
    
    return (
    <>
        <Card className='todoCard' sx={{ minWidth: 275 ,background: todo.isCompleted ? "rgba(129, 129, 129, 0.94)":"rgba(19, 102, 83, 0.9)",color:"white",marginTop:5}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={8} textAlign="start">
                        <Typography variant="h5" sx={{textDecoration:todo.isCompleted?"line-through":"none"}}>
                            {todo.title}
                        </Typography>
                        <Typography variant="h6">
                            {todo.detail} 
                        </Typography>
                    </Grid>

                    <Grid  size={4} display="flex" alignItems="center" justifyContent="space-around"> 
                        <IconButton 
                            onClick={()=>{onchangeClick()}}
                            className='iconButton' 
                            style={{color: todo.isCompleted ? "white" : "#8bc34a",
                                background: todo.isCompleted ? "#8bc34a" : "white",
                                border: "3px solid #8bc34a",
                                marginLeft: 1,
                                "&:hover": {
                                    background: "#f1f8e9",
                                }}}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton 
                            onClick={handleUpdate}
                            className='iconButton' 
                            style={{color: "#2d6ccaff",
                                background: "white",
                                border: "3px solid #2d6ccaff",
                                marginLeft: 1,
                                "&:hover": {
                                    background: "#f1f8e9",
                                }}}>
                            <EditNoteIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleDelete} 
                            className='iconButton' 
                            style={{color: "#b54141e3",
                                background: "white",
                                border: "3px solid #b54141e3",
                                marginLeft: 1,
                                "&:hover": {
                                    background: "#f1f8e9",
                                }}}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </>
    
    );
}
