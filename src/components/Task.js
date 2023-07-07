import '../styles/Task.scss'
import {ReactComponent as Edit} from '../svg_icons/svg_edit.svg'
import {ReactComponent as Delete} from '../svg_icons/svg_delete.svg'
import {ReactComponent as Ok} from '../svg_icons/svg_ok.svg'
import {ReactComponent as Cancel} from '../svg_icons/svg_cancel.svg'
import {TodayFormat} from './DateFormat'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import ReactDOMServer from 'react-dom/server'
import CalendarPopUp from './Calendar'

function Task(props){
    const block = 'task'
    const {task, deleteF, editF, editionMode, setEditionMode, askAgain, setAskAgain} = props
    let [editInfo, setEditInfo] = useState({
        id: task.id,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        created: TodayFormat(),
        completed: task.completed,
        active: task.active
    })
    const [calendar, setCalendar] = useState(false)
    const [ask, setAsk] = useState(false)
    const handleEvent = (event)=>{
        const {name, value} = event.target
        setEditInfo({
            ...editInfo,
            [name]: value
        })
    }
    const turnOffEditMode = (option, event)=>{
        event.preventDefault()
        if(option === 'edit'){
            editF(editInfo)
        } else {
            setEditInfo((prev)=>({
                ...prev,
                due_date: task.due_date
            }))
        }
        setEditionMode('')
    }
    const handleCheck =()=>{
        if(askAgain.ask && (!task.completed)){
            Swal.fire({
                icon: 'info',
                text: 'Do you want to delete this task from the displayed list?',
                html: ReactDOMServer.renderToString(<div>
                    <p>Do you want to delete this task from the displayed list?</p>
                    <label htmlFor='doNotCheckbox'>Do not ask again</label>
                    <input 
                    id='doNotCheckbox'
                    type='checkbox'
                    defaultChecked={ask}
                    ref={(input) => {
                        if (input) {
                            input.indeterminate = false;
                            input.checked = ask;
                        }
                    }}/>
                </div>),
                showCancelButton: true,
                cancelButtonText: 'Do not delete',
                showConfirmButton: true,
                confirmButtonText: 'Delete taks',
                didOpen: () => {
                    const checkbox = document.getElementById('doNotCheckbox');
                    if (checkbox) {
                      checkbox.addEventListener('change', () => {
                        setAsk(checkbox.checked)
                      })
                    }
                  }
            }).then((result) => {
                if (result.isConfirmed){
                    setAskAgain((prev) =>({
                        ...prev,
                        answer: true
                    }))
                    deleteF(task.id)
                } else {
                    setAskAgain((prev) =>({
                        ...prev,
                        answer: false
                    }))
                }
            })
        }

        if (!askAgain.ask && askAgain.answer){
            deleteF(task.id)
        }
    }
    const handleDueDate = (new_date)=>{
        setEditInfo((prev)=>({
            ...prev,
            due_date: new_date
        }))
    }
    const handleClickCalendar = (e)=>{
        e.preventDefault()
        setCalendar(!calendar)
    }

    useEffect(()=>{
        setAskAgain((prev) =>({
            ...prev,
            ask: !ask
        }))
    }, [ask, setAskAgain])

    return(
        <div className={`${block}__parent`}>
            <div className={`${block}`}>
                <input className={`${block}__check`} type='checkbox' defaultChecked={task.completed} onClick={handleCheck}/>
                <p className={`${block}__title`}>{task.title}</p>
                <div className={`${block}__father`}>
                    <div className={`${block}__child`}>
                        <Edit className={`${block}__svg`} onClick={()=>setEditionMode(task.id)}/>
                        <Delete className={`${block}__svg`} onClick={()=>deleteF(task.id)}/>
                    </div>
                    <p className={`${block}__date`}>{task.due_date}</p>
                </div>
            </div>
            <div className={`${block}__description`}>
                <p className={`${block}__description__text`}>{task.description}</p>
            </div>

            { editionMode === task.id && <form onSubmit={(e)=>turnOffEditMode('edit', e)} className={`${block}__edition`}>
                <div className={`${block}__edition--inputs`}>
                    <input name='title' defaultValue={task.title} onChange={(e)=>handleEvent(e)}/>
                    <input id='description-input-edit' name='description' defaultValue={task.description} onChange={(e)=>handleEvent(e)}/>
                </div>

                <div className={`${block}__edition--btns`}>
                    <div className={`${block}__edition--btns-date`}>
                        <button type='button' onClick={handleClickCalendar}>
                            {editInfo.due_date}
                        </button>
                        { calendar && <CalendarPopUp setShow={setCalendar} setDue={handleDueDate}/> }
                    </div>
                    <div className={`${block}__edition--btns-ok-cancel`}>
                        <button type='submit'>
                            <Ok/>
                        </button>
                        <button type='button'>
                            <Cancel type='button' onClick={(e)=>turnOffEditMode('cancel', e)}/>
                        </button>
                    </div>
                </div>
            </form>}
        </div>
    )
}

export default Task