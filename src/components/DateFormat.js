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