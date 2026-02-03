import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Divider, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';


//ICONS-----------------
import AddIcon from '@mui/icons-material/Add';
//COMPONENTS------------
import Todo from "./Todo";
import { useTodos } from './contexts/myContext';
//REACT-----------------
import {useToast}  from './contexts/toastContext';
import { useState ,useEffect,useMemo} from 'react';

//REDUCERS--------------




export default function ToDoList() {

    const {todos,dispatch} = useTodos();
    const { showHideToast} = useToast();
    
    //STATES-------------------------------------
    const [showDialogUpdate,setShowDialogUpdate] = useState(false);
    const [showDialog,setShowDialog] = useState(false);
    const [updatedTodo,setUpdatedTodo] = useState({title:"",detail:""})
    const [titleInput,setTitelInput] = useState("");
    const [toggleValue,setToggleValue] = useState("all")
    const [dialogTodo,setDialogTodo] = useState(null)

    //OTHER ------------------------------
    
    // LOOPS--------------------------------
    const completed = useMemo(() =>{
        return todos.filter((t)=>{
            return t.isCompleted;
        });
    },[todos])
    const notCompleted =useMemo(() =>{
        return todos.filter((t)=>{
    
        return !t.isCompleted;
        });
    },[todos]);
    let x = todos ;
    if(toggleValue === "completed"){
        x = completed ;
    }else if(toggleValue === "notCompleted"){
        x =notCompleted;
    }else{
        x= todos}
    const todosjsx = x.map((t) =>{
        return <Todo key={t.id} todo={t} showDelete={showDeleteDialog} showUpdate={showUpdateDialog}/>
    })


    //LOCALSTORGE-------------------------
    useEffect(() => {
        dispatch({
            type: "get"
        })
    }, []);
    //BUTTON HANDLE FANCTİON------------------------
    function handleAddClick(){
        dispatch({
            type: "added",
            payload: {title:titleInput}
        });
        setTitelInput("");
        showHideToast("Görev başarıyla eklendi");
    }
    //TOGGLE HANDLE FANCTİON------------------------
    function handleChangeToggle(e){
        setToggleValue(e.target.value);
    }
    //DIALOGS HANDLE -------------------------------------
    function handleClose(){
        setShowDialog(false)
    }
    function handleCloseUpdate(){
        setShowDialogUpdate(false)
    }
    function showDeleteDialog(todo){
        setDialogTodo(todo)
        setShowDialog(true)
    }
    function showUpdateDialog(todo,todotitle,tododetail){
        setDialogTodo(todo)
        setUpdatedTodo({title:todotitle,detail:tododetail})
        setShowDialogUpdate(true)
    }
    function handleDeleteAgree(){
        dispatch({
            type:"deleted",
            payload:{id: dialogTodo.id}
        });
        handleClose()
        showHideToast("Görev başarıyla silindi");
        
    }
    function handleUpdateAgree(){
        dispatch({
            type:"updated",
            payload:{              
                id: dialogTodo.id,
                title: updatedTodo.title,
                detail : updatedTodo.detail,

            }
        })
        handleCloseUpdate()
        showHideToast("Görev başarıyla güncellendi")
    }
    
  return (
    <>
        <Dialog
            onClose={handleClose}
            open={showDialog}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id="alert-dialog-title">
                Silmek istediğinizden eminmisiniz?
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
                Sildiğiniz veriye bir daha ulaşamazsınız.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hayır</Button>
                <Button onClick={handleDeleteAgree}  autoFocus>
                    Evet
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            onClose={handleCloseUpdate}
            open={showDialogUpdate}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id="alert-dialog-title">
                Güncellemek istediğiniz bilgiyi giriniz:
            </DialogTitle>
            <DialogContent>
                <TextField autoFocus
                    margin='dense'
                    id="name"
                    label="Başlık"
                    fullWidth
                    variant='standard'
                    value={updatedTodo.title}
                    onChange={(e) =>{
                        setUpdatedTodo({...updatedTodo, title: e.target.value})
                    }}
                />
                <TextField autoFocus
                    margin='dense'
                    id="name"
                    label="Detaylar"
                    fullWidth
                    variant='standard'
                    value={updatedTodo.detail}
                    onChange={(e) =>{
                        setUpdatedTodo({...updatedTodo, detail: e.target.value})
                    }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseUpdate} >Vazgeç</Button>
                <Button autoFocus onClick={handleUpdateAgree}>
                    Güncelle
                </Button>
            </DialogActions>
        </Dialog>

        <Container maxWidth="sm">
            <Card sx={{ minWidth: 275 }}  style={{
                maxHeight: "80vh",
                overflowY:"scroll",
            }}>
                <CardContent>
                    {/* LIST HEADER */}
                        <Typography variant="h2" component="div">
                            Görev Listesi
                        </Typography>
                    {/* LIST HEADER FINISH*/}

                    <Divider/>

                    {/* TOGGLE BUTTONS */}
                        <ToggleButtonGroup
                            color='secondary'
                            value={toggleValue}
                            exclusive
                            onChange={handleChangeToggle}
                            aria-label="Platform"
                        >
                            <ToggleButton value="all">Tümü</ToggleButton>
                            <ToggleButton value="completed">Gerçekleşen</ToggleButton>
                            <ToggleButton value="notCompleted">Devam Eden</ToggleButton>
                            
                        </ToggleButtonGroup>
                    {/* TOGGLE BUTTONS FINISH */}

                    {/* TODOS */}
                        {todosjsx}
                    {/* TODOS FINISH */}

                    
                    {/* INPUT */}

                        <Grid container marginTop="15px" spacing={1}>
                            <Grid size={8}>
                                <TextField 
                                style={{width:"100%"}} 
                                id="outlined-basic" 
                                label="Görev Yaz" 
                                variant="outlined"
                                value={titleInput} 
                                onChange={(e) => {
                                    setTitelInput(e.target.value);
                                }}/>
                            </Grid>
                            <Grid size={4} display="flex" justifyContent="center">
                                <Button 
                                    color='secondary'
                                    style={{width:"100%",height:"96%"}}
                                    variant="contained"
                                    endIcon={<AddIcon />}
                                    onClick={()=>{handleAddClick()}}
                                    disabled={titleInput !== ""? false : true}>
                                    Ekle
                                </Button>
                            </Grid>
                        </Grid>

                    {/* INPUT FINISH*/}

                </CardContent>
            </Card>
        </Container>
    </>
      
  );
}
