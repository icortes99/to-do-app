import '../styles/Task.scss'
import {ReactComponent as Edit} from '../svg_icons/svg_edit.svg'
import {ReactComponent as Delete} from '../svg_icons/svg_delete.svg'
import {ReactComponent as Ok} from '../svg_icons/svg_ok.svg'
import {ReactComponent as Cancel} from '../svg_icons/svg_cancel.svg'
import {TodayFormat} from './DateFormat'
import { useState } from 'react'

function Task(props){
    const block = 'task'
    const {task, deleteF, editF, editionMode, setEditionMode} = props
    let [editInfo, setEditInfo] = useState({
        id: task.id,
        title: task.id,
        description: task.description,
        due_date: task.due_date,
        created: TodayFormat(),
        completed: task.completed,
        active: task.active
    })
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
        }
        setEditionMode('')
    }

    return(
        <div className={`${block}__parent`}>
            <div className={`${block}`}>
                <input className={`${block}__check`} type='checkbox' defaultChecked={task.completed}/>
                <p className={`${block}__title`}>{task.title}</p>
                <div className={`${block}__father`}>
                    <div className={`${block}__child`}>
                        <Edit className={`${block}__svg`} onClick={()=>setEditionMode(task.id)}/>
                        <Delete className={`${block}__svg`} onClick={()=>deleteF(task.id)}/>
                    </div>
                    <p className={`${block}__date`}>{task.created}</p>
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
                    <button type='submit'>
                        <Ok/>
                    </button>
                    <button type='button'>
                        <Cancel type='button' onClick={(e)=>turnOffEditMode('cancel', e)}/>
                    </button>
                </div>
            </form>}
        </div>
    )
}

export default Task