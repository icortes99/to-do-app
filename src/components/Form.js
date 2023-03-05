import '../styles/Form.scss'
import Task from '../components/Task.js'
import {ReactComponent as List} from '../svg_icons/svg_list.svg'
import {useState} from 'react'

function Form(){
    const block = 'form'
    const [tasks, setTasks] = useState([{
        id: '433c6b39d6fc6',
        title: 'Buy groceries for next week',
        description: 'Groceries: apples, watermelon, orange',
        due_date: '2/2/22',
        created: '2/2/22',
        completed: true,
        active: true
    }, {
        id: 'fd50c99ebac6d',
        title: 'Renew car insurance',
        description: '$60 for tires, $20 insurance and $80 for engine',
        due_date: '2/2/22',
        created: '2/2/22',
        completed: false,
        active: true
    }])
    //const [accordion, setAccordion] = useState(0) //state para manejar cual Task tiene la info desplegada
    const handleSubmit = (event)=>{
        event.preventDefault()
        const taskTitle = event.target.elements.taskTitle.value
        const taskDescription = event.target.elements.taskDescription.value
        const taskDueDate = '3/3/03'//event.target.elements.taskDueDate.value
        const newTask = {
            id: Math.random().toString(16).slice(2),
            title: taskTitle,
            description: taskDescription,
            due_date: taskDueDate,
            created: new Date().toLocaleDateString('es-ES').replace(/\//g, '/').slice(0, -2),
            completed: false,
            active: true
        }
        setTasks([...tasks, newTask])
        event.target.reset()
    }
    const deleteTask = (idTask)=>{
        console.log('idtask' + idTask)
        let newTasks = tasks
        const index = newTasks.findIndex(obj => obj.id === idTask)
        let temp = newTasks[index]
        temp.active = false
        //newTasks.splice(index, 1)
        newTasks[index] = temp
        console.log('new tasks' + JSON.stringify(newTasks))
        setTasks(newTasks)
    }

    return(
        <div className={`${block}`}>
            <div className={`${block}__workspace`}>
                <div className={`${block}__workspace__title`}>
                    <List className={`${block}__list-icon`}/>
                    <h1>My Todo-s</h1>
                </div>
                <form onSubmit={handleSubmit} className={`${block}__form`}>
                    <div className={`${block}__form__inputs`}>
                        <input name='taskTitle' placeholder='New task'/>
                        <input name='taskDescription' placeholder='New description'/>
                    </div>
                    <div className={`${block}__form__buttons`}>
                        <label htmlFor='due_date'></label>
                        <input id='due_date' type='date' className={`${block}__calendar-input`}/>
                        <button type='submit'>ADD</button>
                    </div>
                </form>
                {tasks.map((i, j)=>
                    <Task
                    key={j}
                    task={i}
                    deleteF={deleteTask}/>
                )}
            </div>
        </div>
    )
}

export default Form