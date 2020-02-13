import date, { timestamp, unixTimestamp } from '../src/date'

test('timestamp', () => {
  expect(timestamp()).toBeLessThanOrEqual(Date.now())
})

test('unixTimestamp', () => {
  expect(unixTimestamp()).toBe(Math.floor(Date.now() / 1000))
})

test('unix date', () => {
  const unixts = 1581571610
  expect(date(unixts).unix()).toBe(unixts)
})

test('date', () => {
  const dateStr = '2020-02-02'
  expect(date(dateStr).format('YYYY-MM-DD')).toBe(dateStr)
})
