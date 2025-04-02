<h1>Value Area Calculation</h1>
<h2>Introduction</h2>
<ul>
  <li>A calculator for the Fixed Range Volume Profile in TypeScript.</li>
  <li>By default, the histogram will use <strong>24 rows</strong> like TradingView.</li>
  <li>It can calculate values for the <strong>current & previous day</strong>, <strong>current & previous week</strong>, <strong>current & previous month</strong>.</li>
  <li>Values returned are <strong>Point of Control (POC)</strong>, <strong>Value Area High (VAH)</strong>, <strong>Value Area Low (VAL)</strong>, <strong>low</strong>, <strong>high</strong>.</li>
  <li>There is test data that uses <strong>ByBit Kline data</strong>, and it currently only handles that data.</li>
</ul>

<h2>Usage</h2>
To use the Value Area Calculation package, import it into your project and use it like this:

```ts
import { pdVA } from 'value-area-calculation'

const myData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const result = pdVA(myData, 4)

console.log(result)
```
📦 Part of the [chart-patterns Library](https://github.com/focus1691/chart-patterns)
