import { ref, onMounted, onUnmounted } from 'vue'
import Clipboard from 'clipboard'

const useClipboard = () => {
  const clipboard = ref(null)
  const copyText = (text) => {
    const fakeElement = document.createElement('button')
    fakeElement.id = 'copy-button'
    clipboard.value = new Clipboard(fakeElement, {
      text: () => text,
      action: 'copy',
    })
    document.body.appendChild(fakeElement)
    fakeElement.click()
    setTimeout(() => {
      clipboard.value.destroy()
      document.querySelector('#copy-button').remove()
      ElNotification({
        title: 'Success',
        message: `复制成功！: ${text}`,
        type: 'success',
        showClose: false,
      })
    }, 100)
  }

  onUnmounted(() => {
    if (clipboard.value) {
      clipboard.value.destroy()
    }
  })

  return {
    copyText,
  }
}

export default useClipboard
