import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

export default function TodoList() {
    let [todos, setTodos]= useState([{task: "", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo]= useState("");

    //to clear default first empty task on page load every time
    useEffect(() => {
        setTodos([]);
    }, [])
    
    let addNewTask= () =>{
        if (newTodo.trim() === "") { // Check for empty or whitespace-only input
            alert("Task cannot be empty!");
            return;
        }

        setTodos([...todos, {task: newTodo, id: uuidv4(), isDone: false }]);
        setNewTodo("");
    }

    //for better UX, pressing enter key shd add task
    let handleEnterPress= (e)=>{
        if(e.key === "Enter"){
            addNewTask();
        }
    }

    let updateTodoValue= (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTodo= (id) =>{
        let confirmDelete = confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
        }
    }

    let deleteAll = () => {
        let confirmDeleteAll = confirm("Are you sure you want to delete all tasks?");
        if (confirmDeleteAll) {
            setTodos([]); //passing an empty array in current state, hence empty array is returned with no tasks
        }
		
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
        }));
    }

    let editTask= (id) =>{
        let currentTask = todos.find((todo) => todo.id === id)?.task || ""; // Get current task text pre-filled, for better UX
        let newTask = prompt("Edit your task:", currentTask); // Open prompt with pre-filled task
    
        // If user enters an empty/whitespace-only string, show alert & do nothing
        if (newTask.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }
    
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, task: newTask }
                    : todo
            )
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
        <>
        <div className="mainBox">
            <h1>To-Do List App</h1>
            <input type="text" placeholder="Add a task" onKeyDown={handleEnterPress} onChange={updateTodoValue} value={newTodo}  />
            <br />
            <button  onClick={addNewTask} id="addBtn">➕ Add Task</button>
            <br /><br />
            <hr />

            <h4>Tasks to do:</h4>
            <ul >
                {todos.map((todo) =>(
                    <li key={todo.id}>
                        <div className="singleTodo">
                            <span style={todo.isDone ? {textDecoration: "line-through"} : {}}> {todo.task} </span> 
                        
                        
                            <button onClick={() => editTask(todo.id)}> 📝 Edit   </button>
                            <button onClick={() => upperCaseOne(todo.id)}>🅰️ Upper-case  </button>
                            <button onClick={() => markAsDoneOne(todo.id)}>✅ Done  </button>
                            <button onClick={() => deleteTodo(todo.id)}>❌ Delete </button>
                        </div>
                        
                    </li>
                ))}
            </ul>
            <br /><br />
            <div className="btnsAll">
                <button onClick={upperCaseAll}> 🅰️ Upper-case All </button>
                <button onClick={markAsDoneAll}>✅ Mark All As Done </button>
                <button onClick={deleteAll}>❌ Delete All </button>
            </div>
            </div>
            
            <footer>
                <p>Made with ❤️ by Ankit Nautiyal</p>
            </footer>
        </>
    );
}








