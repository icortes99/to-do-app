import '../styles/Task.scss'
import {ReactComponent as Edit} from '../svg_icons/svg_edit.svg'
import {ReactComponent as Delete} from '../svg_icons/svg_delete.svg'
import { useState } from 'react'

function Task(props){
    const block = 'task'
    const {task, editTask, deleteF, editF, editionMode, setEditionMode} = props
    let [editInfo, setEditInfo] = useState({
        id: task.id,
        title: '**********',
        description: '**********',
        due_date: '*********',
        created: task.created,
        completed: task.completed,
        active: task.active
    })
    //onClick={()=>editF(editInfo)} //esto es para editar, va en el boton Ok
    const handleEvent = (event)=>{
        const {name, value} = event.target
        setEditInfo('')
    }
    const turnOffEditMode = (option)=>{
        if(option === 'edit'){
            editTask((previousArr) =>{
                previousArr.map((item)=>{
                    item.id = task.id ? {...item, editInfo} : item
                })
            })
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

            { editionMode === task.id && <div className={`${block}__edition`}>
                <div className={`${block}__edition--inputs`}>
                    <input name='title' defaultValue={task.title} onChange={(e)=>handleEvent(e)}/>
                    <input name='description' defaultValue={task.description} onChange={(e)=>handleEvent(e)}/>
                </div>

                <div className={`${block}__edition--btns`}>
                    <button onClick={()=>turnOffEditMode('edit')}>Save</button>
                    <button onClick={()=>turnOffEditMode('cancel')}>Cancel</button>
                </div>
            </div>}
        </div>
    )
}

export default Task