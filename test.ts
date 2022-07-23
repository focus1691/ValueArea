import moment from 'moment'
import { ValueArea } from'./index'
import { IValueArea, TIME_PERIODS } from'./types'

import daily from'./data/daily.json'
import weekly from'./data/weekly.json'
import monthly from'./data/monthly.json'

const ta = new ValueArea()

/**
  * This was the date when the calculations were made for the value areas
  * This is important when working out what the previous day, week, and month was
  * The previous day from here was July 22nd
  * The previous week from here was July 11 - July 17
  * The previous month from here was June 1 - June 30
 */
const from = moment(new Date('July 23, 2022 01:15:00'))

const pdValueArea: IValueArea = ta.getLevelsForPeriod(daily.result, TIME_PERIODS.DAY, from, true)
const pwValueArea: IValueArea = ta.getLevelsForPeriod(weekly.result, TIME_PERIODS.WEEK, from, true)
const pmValueArea: IValueArea = ta.getLevelsForPeriod(monthly.result, TIME_PERIODS.MONTH, from, true)

console.log('Previous Day', JSON.stringify(pdValueArea, null, 2))
console.log('Previous Week', JSON.stringify(pwValueArea, null, 2))
console.log('Previous Month', JSON.stringify(pmValueArea, null, 2))
