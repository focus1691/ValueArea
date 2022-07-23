import { ValueArea } from'./index'
import { IValueArea, TIME_PERIODS } from'./types'

import daily from'./data/daily.json'
import weekly from'./data/weekly.json'
import monthly from'./data/monthly.json'

const ta = new ValueArea()
const pdValueArea: IValueArea = ta.getLevelsForPeriod(daily.result, TIME_PERIODS.DAY, true)
const pwValueArea: IValueArea = ta.getLevelsForPeriod(weekly.result, TIME_PERIODS.WEEK, true)
const pmValueArea: IValueArea = ta.getLevelsForPeriod(monthly.result, TIME_PERIODS.MONTH, true)

console.log('Previous Day', JSON.stringify(pdValueArea, null, 2))
console.log('Previous Week', JSON.stringify(pwValueArea, null, 2))
console.log('Previous Month', JSON.stringify(pmValueArea, null, 2))
