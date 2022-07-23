export interface IVolumeRow {
  volume: number
  low: number
  high: number
  mid: number
}

export interface IValueArea {
  high: number
  VAH: number
  POC: number
  VAL: number
  low: number
}

export enum TIME_PERIODS {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}
