import { Theme, createMuiTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const getTheme = (): Theme => {
  let prefersDarkMode = false
  try {
    prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  } catch {
    prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
  })
  return theme
}
