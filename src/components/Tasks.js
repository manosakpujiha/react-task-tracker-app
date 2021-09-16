import Task from "./Task"

const Tasks = ({tasks, del, onToggle }) => {
    return (
        <>
           {tasks.map((item) => (<Task key = {item.id} tasksed={item} del = {del} onToggle = {onToggle} />))  } 
        </>
    )
}

export default Tasks
