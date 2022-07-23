## 一个生成当月日历数据的插件


默认为周日为第一天， 可以在 new 的时候传入 1 为 周一是第一天

```js
const c = new Calendar()
c.monthDates(2022,7) // 返回一个当月数据的二维数组
```

另外还有其他的 api，因为是 typescript 写的，可以自行探索，不过价值不大