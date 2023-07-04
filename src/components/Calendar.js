import React from 'react'
import '../styles/Calendar.scss'
import Calendar from 'rc-calendar'
import 'rc-calendar/dist/rc-calendar.css'
import { CalendarDateConversion } from './DateFormat'

export default function CalendarPopUp(props){
    const block = 'calendar'
    const {setShow, setDue} = props

    const handleDate = (date)=>{
        setShow(false)
        setDue(CalendarDateConversion(JSON.stringify(date._d)))
    }

    return(
        <div className={`${block}`}>
            <Calendar onSelect={handleDate}/>
        </div>
    )
}