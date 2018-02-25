import React from 'react'
import moment, { Moment } from 'moment'
import PropTypes from 'prop-types'

import styles from './common.css'


const getStyles = ({ date, active }) => {
  const classes = [styles.day]

  if (active) {
    classes.push('active')
  }

  if (date.isSame(moment(), 'day')) {
    classes.push('today')
  }

  return classes.join(' ')
}


const defaultRenderDay = ({ date }) => {
  const weekday = date.format('dd')[0]
  const day = date.date()

  const month = ((date.day() === 1) || day === 1) ? date.format('MMM') : (<span>&nbsp;</span>)

  return (
    <React.Fragment>
      <span>{month}</span>
      <span>{weekday}</span>
      <span>{day}</span>
    </React.Fragment>
  )
}

/**
 * WeekStripDay 
 */
const WeekStripDay = ({ date, active }) => {

  const momentDate = moment(date)

  return (
    <div className={getStyles({ date, active })}>
      {defaultRenderDay({ date: momentDate })}
    </div>
  )
}


WeekStripDay.propTypes = {
  active: PropTypes.bool,
  /** Default: today */
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment)
  ])
}

export default WeekStripDay
