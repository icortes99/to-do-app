import '../styles/Form.scss'
import Task from '../components/Task.js'
import {ReactComponent as List} from '../svg_icons/svg_list.svg'
import {ReactComponent as Calendar} from '../svg_icons/svg_calendar.svg'
import {ReactComponent as Info} from '../svg_icons/svg_info.svg'
import {useState} from 'react'
import Swal from 'sweetalert2'
import CalendarPopUp from './Calendar'
import { TodayFormat } from './DateFormat'

function Form(){
    const block = 'form'
    const [tasks, setTasks] = useState([{
        id: '433c6b39d6fc6',
        title: 'Buy groceries for next week',
        description: 'Groceries: apples, watermelon, orange',
        due_date: '2/2/22',
        created: '2/2/22',
        completed: false,
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
    const [editMode, setEditMode] = useState('')
    const [askAgain, setAskAgain] = useState({ask: true, answer: true})
    const [calendar, setCalendar] = useState(false)
    const [dueDate, setDueDate] = useState(TodayFormat())

    const handleSubmit = (event)=>{
        event.preventDefault()
        const taskTitle = event.target.elements.taskTitle.value
        const taskDescription = event.target.elements.taskDescription.value
        const newTask = {
            id: Math.random().toString(16).slice(2),
            title: taskTitle,
            description: taskDescription,
            due_date: dueDate,
            created: new Date().toLocaleDateString('es-ES').replace(/\//g, '/').slice(0, -2),
            completed: false,
            active: true
        }
        if (newTask.title && newTask.description){
            setTasks([...tasks, newTask])
            event.target.reset()
        } else {
            Swal.fire('Information required', 'Please check all inputs before submitting your new task', 'error')
        }
    }
    const deleteTask = (idTask)=>{
        setTasks((prevTasks)=>{
            const tasksUpdated = prevTasks.slice()
            const index = tasksUpdated.findIndex(obj => obj.id === idTask)
            tasksUpdated[index] = {...tasksUpdated[index], active : false}
            return tasksUpdated
        })
    }
    const editTask = (taskModified)=>{
        setTasks((prevTasks)=>{
            const tasksUpdated = prevTasks.slice()
            const index = tasksUpdated.findIndex(obj => obj.id === taskModified.id)
            tasksUpdated[index] = taskModified
            return tasksUpdated
        })
    }
    const handleCalendar = (e)=>{
        //abrir el input del calendario
        //guardar el valor en el objeto newTask
        e.preventDefault()
        //dateInputRef.current.focus()
        console.log('open calendar')
        setCalendar(!calendar)
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
                        <button onClick={handleCalendar} className={`${block}__form__buttons--calendar`} type='button'>
                            <Calendar id='calendar-svg'/>
                        </button>
                        {calendar && <CalendarPopUp show={calendar} setShow={setCalendar} due={dueDate} setDue={setDueDate}/>}
                        <button className={`${block}__form__buttons--add`} type='submit' aria-label='Calendar'>ADD</button>
                    </div>
                </form>
                <div className={`${block}__br`}/> 
                {tasks.some(x => x.active === true) ? tasks.map((i, j)=>
                    i.active &&
                    <Task
                    key={j}
                    task={i}
                    deleteF={deleteTask}
                    editF={editTask}
                    editionMode={editMode}
                    setEditionMode={setEditMode}
                    askAgain={askAgain}
                    setAskAgain={setAskAgain}/>
                ) : <div className={`${block}__notasks`}>
                        <Info id='info-svg' />
                        <p>No tasks yet</p>
                    </div>}
            </div>
        </div>
    )
}

export default Form