import {FaTimes} from 'react-icons/fa'

const Task = ({tasksed, del, onToggle}) => {
    return (
        <div className={`task  ${tasksed.reminder ? 'reminder' : ''}`}  //use regular strings
            onDoubleClick = {() => onToggle(tasksed.id)}>
            <h3>{tasksed.text} <FaTimes style = {{color : "red", cursor: "pointer"}} onClick = {() => del(tasksed.id)}/> </h3>
            <p>{tasksed.day}</p>
        </div>
    )
}
export default Task                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            