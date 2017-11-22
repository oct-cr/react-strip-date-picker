import React from 'react'
import moment from 'moment'

import styles from './common.css'


const WeekStripDay = ({ date, active }) => {

  const momentDate = moment(date)
  const weekday = momentDate.format('dd')
  const month = momentDate.format('MMM')

  function getStyles() {
    const classes = [styles.day]

    if (active) {
      classes.push('active')
    }

    if (date.isSame(moment(), 'day')) {
      classes.push('today')
    }

    return classes.join(' ')
  }


  return (
    <div className={getStyles()}>
      <span>{weekday}</span>
      <span>{month}</span>
      <span>{date.date()}</span>
    </div>
  )
}

export default WeekStripDay
