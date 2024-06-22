import { ref } from 'vue'

const formatingAmount = (value, isCode = true) => {
  return `${isCode ? '$ ' : ''}${value?.toLocaleString('en-US')}`
}

const months = {
  long: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  shortFiscal: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
}

const isDark = ref(localStorage.getItem('isDark') == 'false' ? false : true)

const updateTheme = (val) => {
  localStorage.setItem('isDark', `${val}`)
  isDark.value = val
}

const allProviders = {
  formatAmount: formatingAmount,
  isDark: {
    isDark,
    updateTheme
  },
  months
}

const provideSharedData = (app) => {
  for (const [key, value] of Object.entries(allProviders)) {
    app.provide(key, value)
  }
}
const useCopyToClipboard = async (text) => {
  const status = await navigator.clipboard
    .writeText(text)
    .then(() => {
      return { msg: 'Link copied', color: 'is-success' }
    })
    .catch(() => {
      return { msg: 'Sorry ! Error', color: 'is-danger' }
    })
  return status
}
export { provideSharedData, useCopyToClipboard }
