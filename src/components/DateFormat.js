export function TodayFormat(){
    let today = new Date(Date.now())
    const format = {month: 'numeric', day: 'numeric', year: '2-digit'}
    today = today.toLocaleDateString('en-US', format)
    return today
}

export function LongDate(date){
    const dateObj = new Date(date)
    const format = {month: 'long', day: 'numeric', year: 'numeric'}
    const result = dateObj.toLocaleDateString('en-US', format)
    return result
}

export function CalendarDateConversion(date){
    let temp = date.split('-')
    let response = ''

    //Month
    let month = temp[1].split('')
    if(month[0] === '0'){
        response = month[1]
    } else {
        response = temp[1]
    }
    response = response + '/'

    //Day
    let day = temp[2].split('T')
    if (parseInt(day[0]) < 10){
        let temp2 = day[0].split('')
        response = response + temp2[1] + '/'
    } else {
        response = response + day[0] + '/'
    }

    //Year
    let temp3 = temp[0].split('')
    response = response + temp3[3] + temp3[4]

    return response
}