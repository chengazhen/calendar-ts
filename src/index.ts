type Week = Array<string | Date | number>

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
   * @param {function} dayFormatter
   */
  monthDates(year: number, month: number, dayFormatter: (d: Date) => string | Date | number): Array<Week> {
    if (year < 1970)
      console.warn('year must be a number >= 1970')

    if ((month < 0) || (month > 11))
      console.error('month must be a number (Jan is 0)')

    let week: Week = []

    const weeks: Array<Week> = []

    let date = this.weekStartDate(new Date(year, month, 1))

    do {
      for (let i = 0; i < 7; i++) {
        week.push(dayFormatter ? dayFormatter(date) : date)
        date = new Date(date.getTime())
        date.setDate(date.getDate() + 1)
      }
      weeks.push(week)
      week = []
    } while ((date.getMonth() <= month) && (date.getFullYear() === year))

    return weeks
  }

  monthDays(year: number, month: number) {
    const getDayOrZero = (date: Date) => {
      return date.getMonth() === month ? date.getDate() : 0
    }
    return this.monthDates(year, month, getDayOrZero)
  }

  monthText(year: number, month: number) {
    const getDayOrBlank = (date: Date) => {
      let s = date.getMonth() === month ? date.getDate().toString() : '  '
      while (s.length < 2) s = ` ${s}`
      return s
    }
    const weeks = this.monthDates(year, month, getDayOrBlank)
    return weeks.join('\n')
  }
}

