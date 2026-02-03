import ToDoList from "./ToDoList";
import './App.css';
import { useState } from 'react';
import TodosProvider from "./contexts/myContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastProvider } from "./contexts/toastContext";

const { v4: uuidv4 } = require("uuid");

const theme = createTheme({
  palette: {
    secondary: {
      main: '#004d40',
    }
  }
});

const todosList = [
    {
        id:uuidv4(),
        title:"Kitap oku",
        detail:"en az 10 sayfa ",
        isCompleted:false,
    },
    {
        id:uuidv4(),
        title:"Kitap oku",
        detail:"en az 10 sayfa ",
        isCompleted:false,
    },
    {
        id:uuidv4(),
        title:"Kitap oku",
        detail:"en az 10 sayfa ",
        isCompleted:false,
    },

]
function App() {
  const [todos,setTodos] = useState(todosList);
  
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:" rgba(21, 21, 21, 0.97)"}}>
              <ToDoList/>
            
        </div>
        
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
