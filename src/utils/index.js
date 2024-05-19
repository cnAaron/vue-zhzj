/**
 * @name 防抖函数
 * @param {*} func 函数
 * @param {*} wait
 * @returns void
 */
export const debounce = (fn, delay) => {
  let timerId
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
