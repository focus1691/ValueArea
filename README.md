<p align="center">
  <a href="#">
    <img src="https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png" alt="Value Area Calculation" width="200">
  </a>
</p>
<h1 align="center">Value Area Calculation</h1>
<p align="center">FRVP Technical Indicator for Value Area calculations: pdVA, pwVA, pmVA</p>
<h2 align="center">Introduction</h2>
<ul>
  <li>A calculator for the Fixed Range Volume Profile in TypeScript.</li>
  <li>By default, the histogram will use <strong>24 rows</strong> like TradingView.</li>
  <li>It can calculate values for the <strong>current & previous day</strong>, <strong>current & previous week</strong>, <strong>current & previous month</strong>.</li>
  <li>Values returned are <strong>Point of Control (POC)</strong>, <strong>Value Area High (VAH)</strong>, <strong>Value Area Low (VAL)</strong>, <strong>low</strong>, <strong>high</strong>.</li>
  <li>There is test data that uses <strong>ByBit Kline data</strong>, and it currently only handles that data.</li>
</ul>
<h2 align="center">Technologies used in this project</h2>
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="64" height="64">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="64" height="64">
</p>
<h2 align="center">Installation</h2>
To use the Value Area Calculation package, install it using npm:

To use the Value Area Calculation package, install it using npm:

bash
Copy code
npm install value-area-calculation
<h2 align="center">Usage</h2>
To use the Value Area Calculation package, import it into your project and use it like this:

```ts
import { pdVA } from 'value-area-calculation'

const myData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const result = pdVA(myData, 4)

console.log(result)
```

<h2 align="center">Contributing</h2>
Contributions to the project are always welcome! Please open an issue or a pull request if you'd like to contribute.

<h2 align="center">License</h2>
This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for more information.
