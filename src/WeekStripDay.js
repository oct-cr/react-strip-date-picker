import React from 'react'
import moment, { Moment } from 'moment'
import PropTypes from 'prop-types'

import styles from './common.css'


const today = new Date()


const getStyles = ({ date, active, disabled }) => {
  const classes = [styles.day]

  if (active) {
    classes.push('active')
  }

  if (disabled) {
    classes.push('disabled')
  }

  if (date.isSame(today, 'day')) {
    classes.push('today')
  }

  return classes.join(' ')
}


const defaultRenderDay = ({ date, classes }) => {
  const weekday = date.format('dd')[0]
  const day = date.date()

  const month = ((date.day() === 1) || day === 1) ? date.format('MMM') : (<span>&nbsp;</span>)


  return (
    <div className={classes}>
      <span>{month}</span>
      <div className="day">
        <span>{weekday}</span>
        <span>{day}</span>
      </div>
    </div>

  )
}


export const WeekStripDay = ({ date, active, disabled }) => {

  const momentDate = moment(date)

  return defaultRenderDay({
    date: momentDate, disabled,
    classes: getStyles({ date, active, disabled })
  })
}


WeekStripDay.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  /** Default: today */
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment)
  ])
}
