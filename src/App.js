import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState, useEffect} from "react"
import AddTask from './components/AddTask'



const App = () => {
  const [showAddTask, setShowAddTask] = useState(false) 
  const [tasks, setTasks] = useState ([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }


    getTasks();
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json ();
    return data;
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json ();
    return data;
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })
      const data = await res.json()
      setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, 
    reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()

    setTasks(tasks.map((task) => 
    task.id === id ? {...task, reminder: data.reminder} : task))
}
  
  //Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: `DELETE`
  })

  // let r =[];
  //   for (let i = 0; i < tasks.length; i++) {
  //     if(tasks[i].id !== id) {
  //       r.push(tasks[i])
  //     }
  //   }
  //   console.log(r)
  //   setTasks(r)
  let b = [...tasks]

  b.splice(b.findIndex((element) => element.id === id), 1)
  setTasks(b)
  console.log(b)
  // setTasks(tasks.filter((task) => task.id !== id)) //explain, try using splice instead of filter
}
  return (
    <div className="container">
        <Header title = {"Task Tracker"} onAdd = {() => setShowAddTask( !showAddTask)}  showAdd = {showAddTask}/>
        {showAddTask && <AddTask onAdd = {addTask}/>}
        {/* if (tasks.length > 0) <Tasks tasks = {tasks} del = {deleteTask} />
         else "No tasks to show"  */}
        {tasks.length > 0 ? <Tasks tasks = {tasks} del = {deleteTask} onToggle = {toggleReminder} /> : "No tasks to show"} 
        {/* convert to if statement */}
    </div>
  );
}

export default App;
