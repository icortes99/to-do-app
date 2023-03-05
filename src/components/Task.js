import '../styles/Task.scss'
import {ReactComponent as Edit} from '../svg_icons/svg_edit.svg'
import {ReactComponent as Delete} from '../svg_icons/svg_delete.svg'

function Task(props){
    const block = 'task'
    const {task, deleteF} = props

    return(
        <div className={`${block}`}>
           <input className={`${block}__check`} type='checkbox' defaultChecked={task.completed}/>
           <p className={`${block}__title`}>{task.title}</p>
           <div>
                <Edit className={`${block}__svg`}/>
                <Delete className={`${block}__svg`} onClick={()=>deleteF(task.id)}/>
                <p className={`${block}__date`}>{task.created}</p>
           </div>
        </div>
    )
}

export default Task