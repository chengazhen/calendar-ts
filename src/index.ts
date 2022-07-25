export default class Calendar {
  firstWeekDay: number

  constructor(firstWeekDay = 0) {
    this.firstWeekDay = firstWeekDay
  }

  weekStartDate(date: Date): Date {
    const starDate: Date = new Date(date.getTime())
    while (starDate.getDay() !== this.firstWeekDay)
      starDate.setDate(starDate.getDate() - 1)

    return starDate
  }

  /**
   * @description: 生成日历数组
   * @param {number} year
   * @param {number} month
   */
  monthDates(year: number, month: number) {
    if (year < 1970)
      console.warn('year must be a number >= 1970')

    if ((month < 0) || (month > 11))
      console.error('month must be a number (Jan is 0)')

    let week: Date[] = []

    const weeks: Array<Date[]> = []

    let date = this.weekStartDate(new Date(year, month, 1))

    do {
      for (let i = 0; i < 7; i++) {
        week.push(date)
        date = new Date(date.getTime())
        date.setDate(date.getDate() + 1)
      }
      weeks.push(week)
      week = []
    } while ((date.getMonth() <= month) && (date.getFullYear() === year))

    return weeks
  }

  monthDays(year: number, month: number) {
    return this.monthDates(year, month).map(row => row.map(col => col.getMonth() === month ? col.getDate() : 0))
  }

  monthText(year: number, month: number) {
    const getDayOrBlank = (date: Date) => {
      let s = date.getMonth() === month ? date.getDate().toString() : '  '
      while (s.length < 2) s = ` ${s}`
      return s
    }
    const weeks = this.monthDates(year, month).map(row => row.map(col => getDayOrBlank(col)))
    return weeks.join('\n')
  }
}

