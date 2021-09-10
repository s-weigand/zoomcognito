import { Theme, createTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const getTheme = (): Theme => {
  let prefersDarkMode = false
  try {
    prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark').matches
  } catch {
    try {
      prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    } catch (error) {
      console.log(`ZoomCognito: Failed to get color-scheme: ${error}`)
    }
  }

  const theme = createTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
  })
  return theme
}
