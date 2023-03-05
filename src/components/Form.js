import '../styles/Form.scss'
import Task from '../components/Task.js'
import {ReactComponent as List} from '../svg_icons/svg_list.svg'
import {useState} from 'react'

function Form(){
    const block = 'form'
    const someTasks = [{
        title: 'Buy groceries for next week',
        description: 'Groceries: apples, watermelon, orange',
        due_date: '2/2/22',
        created: '2/2/22',
        completed: true,
        active: 1
    }, {
        title: 'Renew car insurance',
        description: '$60 for tires, $20 insurance and $80 for engine',
        due_date: '2/2/22',
        created: '2/2/22',
        completed: false,
        active: 1
    }]
    const [tasks, setTasks] = useState([])
    const [accordion, setAccordion] = useState(0) //state para manejar cual Task tiene la info desplegada
    const handleSubmit = (event)=>{
        event.preventDefault()
        const taskTitle = event.target.elements.taskTitle.value
        const taskDescription = event.target.elements.taskDescription.value
        const taskDueDate = event.target.elements.taskDueDate.value
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            due_date: taskDueDate,
            created: new Date().toLocaleDateString('es-ES').replace(/\//g, '/').slice(0, -2),
            completed: false,
            active: 1
        }
        setTasks([...tasks, newTask])
        event.target.reset()
    }

    return(
        <div className={`${block}`}>
            <div className={`${block}__workspace`}>
                <div className={`${block}__workspace__title`}>
                    <List className={`${block}__list-icon`}/>
                    <h1>My Todo-s</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input placeholder='new task'/>
                        <input placeholder='new description'/>
                    </div>
                    <button type='submit'>Add task</button>
                </form>
                <Task task={someTasks[0]}/>
                <Task task={someTasks[1]}/>
            </div>
        </div>
    )
}

export default Form