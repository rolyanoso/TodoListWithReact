const { v4: uuidv4 } = require("uuid");
export default function reducer(currentTodos,action){
    
    switch(action.type){
        case "added":{
            const newTodo = {
                id:uuidv4(),
                title: action.payload.title,
                detail:"",
                isCompleted:false,
            };
            const updated = [...currentTodos,newTodo];
            localStorage.setItem("todos",JSON.stringify(updated));
            return updated;
        }
        case "deleted":{
            const updatedTodos = currentTodos.filter((t) =>{
            // if(todo.id === t.id){
            //     return false
            // }else { return true}
            let id = action.payload.id;
            return t.id !== id;
        });
        
        localStorage.setItem("todos",JSON.stringify(updatedTodos));
        return updatedTodos;
        
        }
        case "updated":{

            const updatedTodos = currentTodos.map((t)=>{
            let id = action.payload.id;
            if(t.id === id){
                return{...t,
                    title: action.payload.title,
                    detail : action.payload.detail}
            }else{
                return t
            }
        })
        localStorage.setItem("todos",JSON.stringify(updatedTodos));
        return updatedTodos;
        }
        case "get" :{
            const renderLoud = JSON.parse(localStorage.getItem("todos")) ?? [];
            return renderLoud;
        }
        case "toggleCompleted":{
            const updated = currentTodos.map((t) => {
            if(action.payload.id === t.id){
                const updatedTodo = {
                    ...t,isCompleted: !t.isCompleted
                }
                return updatedTodo;
            }
            return t;
            });
    
            localStorage.setItem("todos",JSON.stringify(updated));
            return updated;
        }
        default:{
            throw Error("Unknown Action" + action.type)
        }
    }
    
}