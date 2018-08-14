import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'

import { getWeekDays } from './utils'
import { WeekStripDay } from './WeekStripDay'

import styles from './common.css'


export class WeekStripDatePicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedDate: props.date,
      visibleWeek: props.date
    }

    this.handleSelectDay = this.handleSelectDay.bind(this)
    this.setVisibleWeek = this.setVisibleWeek.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedDate: nextProps.date,
      visibleWeek: nextProps.date
    })
  }


  handleSelectDay(date) {
    this.setState(() => ({
      selectedDate: date
    }))

    if (this.props.onChange) {
      this.props.onChange(date.toDate())
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
    return this.state.selectedDate.format('D M Y') === date.format('D M Y')
  }


  isDisabled(date) {
    return this.props.minDate && (date.toDate().getDate() < this.props.minDate.getDate())
  }


  render() {
    const week = getWeekDays(this.state.visibleWeek).map(date => {
      const isDisabled = this.isDisabled(date)

      const wrapperProps = isDisabled ? {} :
        {
          onClick: () => this.handleSelectDay(date),
          style: { cursor: 'pointer' }
        }

      return (
        <div key={date.day()} {...wrapperProps}>
          <WeekStripDay date={date} active={this.isSelected(date)} disabled={isDisabled} />
        </div>
      )
    })


    return (
      <div className={styles.strip} >
        <span onClick={e => this.setVisibleWeek(-7)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" />
          </svg>
        </span>
        {week}
        <span onClick={e => this.setVisibleWeek(7)} >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M7.5 4.5L6.44 5.56 9.88 9l-3.44 3.44L7.5 13.5 12 9z" />
          </svg>
        </span>
      </div >
    )
  }

}


WeekStripDatePicker.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment)
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date)
  ]),
  /** Invoked on day selection with the new date as param */
  onChange: PropTypes.func
}
