import { ref } from 'vue'
import { debounce } from '@/utils'

const width = ref(0)

const setWidth = () => {
  width.value = window.innerWidth
}
const debouncedSetWidth = debounce(setWidth, 200) // 200ms 的防抖延迟

const autoWidth = () => {
  return width.value > 1300 ? `${width.value / 3}px` : '90vw'
}
window.addEventListener('resize', debouncedSetWidth)
setWidth()

export default autoWidth
