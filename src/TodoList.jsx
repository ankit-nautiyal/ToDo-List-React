import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function TodoList() {
    let [todos, setTodos]= useState([{task: "sample-task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo]= useState("");

    let addNewTask= () =>{
        setTodos([...todos, {task: newTodo, id: uuidv4(), isDone: false }]);
        setNewTodo("");
    }

    let updateTodoValue= (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTodo= (id) =>{
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
    }

    let deleteAll = () => {
		setTodos([]); //passing an empty array in current state, hence empty array is returned with no tasks
    };
            
    let upperCaseAll= () =>{
        setTodos((prevTodos) =>  prevTodos.map((todo) =>{
            return{
                ...todo,
                task: todo.task.toUpperCase(),
            };
        }));
    }


    let upperCaseOne= (id) =>{
        setTodos((prevTodos) =>  prevTodos.map((todo) =>{
            if(todo.id === id){
                return{
                    ...todo,
                    task: todo.task.toUpperCase(),
                };
            }
            else{
                return todo;
            }
        }));
    }

    let markAsDoneOne= (id) =>{
        setTodos((prevTodos) => prevTodos.map((todo) =>{
            if(todo.id === id){
                return{
                    ...todo,
                    isDone: true
                };
            }
            else{
                return todo;
            }
        })
    );
    }


    let markAsDoneAll= () =>{
        setTodos((prevTodos) => prevTodos.map((todo) =>{
            return{
                ...todo,
                isDone: true
            };
        })
    );
    }


    return(
        <div>
            <h1>To-do List App</h1>
            <input type="text" placeholder="Add a task" onChange={updateTodoValue} value={newTodo} />
            <br />
            <button onClick={addNewTask}>Add Task</button>
            <br /><br />
            <hr />

            <h4>Tasks to do:</h4>
            <ul >
                {todos.map((todo) =>(
                    <li key={todo.id}>
                        <span style={todo.isDone ? {textDecoration: "line-through"} : {}}> {todo.task} </span> 
                        
                        <button onClick={() => upperCaseOne(todo.id)}> Upper-case </button>
                        <button onClick={() => markAsDoneOne(todo.id)}> Mark As Done </button>
                        <button onClick={() => deleteTodo(todo.id)}> Delete </button>
                    </li>
                ))}
            </ul>
            <br /><br />
            <button onClick={upperCaseAll}>Upper-case All</button>
            <button onClick={markAsDoneAll}>Mark As Done All</button>
            <button onClick={deleteAll}>Delete All</button>
        </div>
    );
}





