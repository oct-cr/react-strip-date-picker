import moment from 'moment'

export const getNext7Days = date => {
  const dates = []

  for (let i = 0; i < 7; i++) {
    const datePointer = moment(date).startOf('day')
    datePointer.add(i, 'days')
    dates.push(datePointer)
  }

  return dates
}

export const getWeekMonday = date => {
  const offset = (date.day() === 0) ? 6 : (date.day() - 1)

  const monday = moment(date)
  monday.subtract(offset, 'days')

  return monday
}

export const getWeekDays = date => {
  const monday = getWeekMonday(moment(date))
  return getNext7Days(monday)
}
