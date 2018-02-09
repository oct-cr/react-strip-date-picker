import moment from 'moment'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import WeekStripDay from './WeekStripDay'
import { getWeekDays } from './utils'

import styles from './common.css'


class WeekStripDatePicker extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedDay: moment(),
      visibleWeek: moment()
    }

    this.handleClick = this.selectDay.bind(this)
    this.setVisibleWeek = this.setVisibleWeek.bind(this)
  }

  selectDay(date, that) {
    this.setState(() => ({
      selectedDay: date
    }))

    if (that.props.onChange) {
      that.props.onChange(date.toDate())
    }
  }

  setVisibleWeek(offsetDays) {
    const date = moment(this.state.visibleWeek)
    date.add(offsetDays, 'days')

    this.setState(() => ({
      visibleWeek: date
    }))
  }

  isSelected(date) {
    return this.state.selectedDay.format('D M Y') === date.format('D M Y')
  }

  render() {
    const week = getWeekDays(this.state.visibleWeek).map(date =>
      <div key={date.day()} onClick={e => this.selectDay(date, this)}>
        <WeekStripDay date={date} active={this.isSelected(date)} />
      </div>
    )


    return (
      <div className={styles.strip}>
        <span onClick={e => this.setVisibleWeek(-7)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" />
          </svg>
        </span>
        {week}
        <span onClick={e => this.setVisibleWeek(7)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M7.5 4.5L6.44 5.56 9.88 9l-3.44 3.44L7.5 13.5 12 9z" />
          </svg>
        </span>
      </div>
    )
  }

}


WeekStripDatePicker.propTypes = {
  onChange: PropTypes.func
}

export default WeekStripDatePicker
