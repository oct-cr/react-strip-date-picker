import assert from 'assert'
import moment from 'moment'

import { getNext7Days, getWeekDays, getWeekMonday } from './utils'


describe('getNext7Days()', () => {

  const next7Days = getNext7Days(new Date('2017-11-15'))

  it('contains 7 elements', () => {
    assert.equal(next7Days.length, 7)
  })

  it('asserts 3 days after', () => {
    assert.equal(next7Days[3].date(), 18)
  })

})



describe('getWeekMonday()', () => {

  it('returns past Monday given a Sunday', () => {
    const pastMonday = getWeekMonday(moment('2017-11-19'))
    assert.equal(pastMonday.day(), 1)
    assert.equal(pastMonday.date(), 13)
  })

  it('returns past Month\'s Monday', () => {
    const pastMonday = getWeekMonday(moment('2017-12-02'))
    assert.equal(pastMonday.day(), 1)
    assert.equal(pastMonday.date(), 27)
  })

})


describe('getWeekDays()', () => {

  const weekDays = getWeekDays(new Date('2017-11-15'))

  it('contains 7 elements', () => {
    assert.equal(weekDays.length, 7)
  })

  it('asserts first day is Monday', () => {
    assert.equal(weekDays[0].day(), 1)
  })

  it('asserts 4th day is Thursday', () => {
    assert.equal(weekDays[3].day(), 4)
  })

})
