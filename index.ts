import moment from 'moment'
import { IVolumeRow, TIME_PERIODS } from './types'
import { countDecimals } from './utils'

function round(number: number, precision: number = 2) {
  if (precision < 0) {
    const factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
  } else {
    return +(Math.round(Number(number + 'e+' + precision)) + 'e-' + precision)
  }
}

export class ValueArea {
  private readonly nRows: number = 24
  private static VA_VOL_PERCENT = 0.7
  constructor(nRows: number = 24) {
    moment.updateLocale('en', {
      week: {
        dow: 1 // Monday is the first day of the week.
      }
    })
    this.nRows = nRows
  }
  sumVolumes(klines) {
    let V_TOTAL: number = 0
    let highest: number = 0
    let lowest: number = Infinity

    for (let i = 0; i < klines.length; i++) {
      const { volume, high, low }: { volume: number, high: number, low: number } = klines[i]
      V_TOTAL += volume

      if (high > highest) highest = high
      if (low < lowest) lowest = low
    }

    return { V_TOTAL: round(V_TOTAL), highest, lowest }
  }

  valueAreaHistogram(klines, highest: number, lowest: number) {
    let row = 0
    const range: number = highest - lowest
    const nDecimals = Math.max(countDecimals(highest), countDecimals(lowest))
    const stepSize: number = round(range / this.nRows, nDecimals)

    const histogram: IVolumeRow[] = []
    let POC_ROW: number = 0
    let POC: number = 0
    let highestVolumeRow: number = 0
    while (histogram.length < this.nRows) {
      histogram.push({
        volume: 0,
        low: round(lowest + stepSize * row, nDecimals),
        mid: round(lowest + stepSize * row + stepSize / 2, nDecimals),
        high: round(lowest + stepSize * row + stepSize, nDecimals)
      } as IVolumeRow)
      row++
    }

    for (let i = 0; i < klines.length; i++) {
      const { volume, close, open, high, low } = klines[i]
      const avg = (high + low) / 2
      const ROW: number = Math.min(this.nRows - 1, Math.floor((avg - lowest) / stepSize))
      histogram[ROW].volume += volume

      if (histogram[ROW].volume > highestVolumeRow) {
        highestVolumeRow = histogram[ROW].volume
        POC = histogram[ROW].mid
        POC_ROW = ROW
      }
    }
    return { histogram, POC, POC_ROW }
  }

  calcValueArea(POC_ROW: number, histogram: IVolumeRow[], V_TOTAL: number) {
    // 70% of the total volume
    const VA_VOL: number = V_TOTAL * ValueArea.VA_VOL_PERCENT

    // Set the upper / lower indices to the POC row to begin with
    // They will move up / down the histogram when adding the volumes
    let lowerIndex: number = POC_ROW
    let upperIndex: number = POC_ROW

    // The histogram bars
    const bars: number = histogram.length - 1

    // The volume area starts with the POC volume
    let volumeArea: number = histogram[POC_ROW].volume

    function isTargetVolumeReached(): boolean {
      return volumeArea >= VA_VOL
    }

    function getNextLowerBar(): number {
      return lowerIndex > 0 ? histogram[--lowerIndex].volume : 0
    }

    function getNextHigherBar(): number {
      return upperIndex < bars ? histogram[++upperIndex].volume : 0
    }

    function getDualPrices(goUp: boolean): number {
      return goUp ? getNextHigherBar() + getNextHigherBar() : getNextLowerBar() + getNextLowerBar()
    }

    function isAtBottomOfHistogram(): boolean {
      return lowerIndex <= 0
    }

    function isAtTopOfHistogram(): boolean {
      return upperIndex >= bars
    }

    function isAllBarsVisited(): boolean {
      return isAtBottomOfHistogram() && isAtTopOfHistogram()
    }

    do {
      const remainingLowerBars: number = Math.min(Math.abs(0 - lowerIndex), 2)
      const remainingUpperBars: number = Math.min(Math.abs(bars - upperIndex), 2)
      const lowerDualPrices: number = getDualPrices(false)
      const higherDualPrices: number = getDualPrices(true)

      if (lowerDualPrices > higherDualPrices) {
        volumeArea += lowerDualPrices
        if (!isAtTopOfHistogram() || remainingUpperBars) {
          // Upper dual prices aren't used, go back to original position
          upperIndex = Math.min(bars, upperIndex - remainingUpperBars)
        }
      } else if (higherDualPrices > lowerDualPrices) {
        volumeArea += higherDualPrices
        if (!isAtBottomOfHistogram() || remainingLowerBars) {
          // Lower dual prices aren't used, go back to original position
          lowerIndex = Math.max(0, lowerIndex + remainingLowerBars)
        }
      }
    } while (!isTargetVolumeReached() || isAllBarsVisited())

    const VAL: number = histogram[lowerIndex].low
    const VAH: number = histogram[upperIndex].high
    return { VAH, VAL }
  }

  getLevelsForPeriod(data: any, period: TIME_PERIODS, currentPeriod: moment.Moment, goToPreviousPeriod: boolean) {
    // We need to start at the start of the (day / week / month), in order to filter all the klines for the VA calculations for that period
    // current day vs previous day, current week vs previous week, current month vs previous month
    const from: moment.Moment = goToPreviousPeriod ? currentPeriod.subtract(1, period).startOf(period) : currentPeriod.startOf(period)
    const periodicKlines = data.filter(({ open_time }) => moment(open_time * 1000).isSame(from, period))

    const { V_TOTAL, highest, lowest }: { V_TOTAL: number, highest: number, lowest: number } = this.sumVolumes(periodicKlines)
    const { histogram, POC, POC_ROW }: { histogram: IVolumeRow[], POC: number, POC_ROW: number } = this.valueAreaHistogram(periodicKlines, highest, lowest)
    const { VAH, VAL }: { VAH: number, VAL: number } = this.calcValueArea(POC_ROW, histogram, V_TOTAL)

    return { VAH, VAL, POC, low: lowest, high: highest }
  }
}