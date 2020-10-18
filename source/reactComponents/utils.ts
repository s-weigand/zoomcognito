import { Theme, createMuiTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const getTheme = (): Theme => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
  })
  return theme
}
