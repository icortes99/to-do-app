import React from 'react'
import '../styles/Calendar.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CalendarPopUp(props){
    const block = 'calendar'
    const {due, setDue} = props

    const handleDate = (date)=>{
        console.log(date.dateStr)
        setDue(date.dateStr)
    }

    let f = new Date()

    return(
        <div className={`${block}`}>
            <DatePicker selected={f} onChange={handleDate} />
            {console.log('calendario desplegado')}
        </div>
    )
}

/*<FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                eventContent={null}
                select={handleDate}
                eventClick={handleDate}
                dayMaxEvents={true}
            />*/