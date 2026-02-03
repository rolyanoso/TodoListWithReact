import { createContext ,useContext,useReducer } from "react";
import reducer from "../reducers/todosReducer";


export const TodosContext = createContext([]);

const TodosProvider = ({children})=>{
    const [todos,dispatch ] = useReducer(reducer,[])
    return(
        <TodosContext.Provider value={{todos,dispatch}}>
            {children}
        </TodosContext.Provider>

    )
};
export const useTodos = () =>{
    return useContext(TodosContext);
};
export default TodosProvider;
// export const MyContext = createContext([]);