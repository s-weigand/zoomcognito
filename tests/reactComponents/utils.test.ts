import useMediaQuery from '@material-ui/core/useMediaQuery'

import { getTheme } from '../../source/reactComponents/utils'

jest.mock('@material-ui/core/useMediaQuery')

it.each(['dark', 'light'])('Theme: %s', (themeType: string) => {
  const mockedUseMediaQuery = useMediaQuery as jest.Mock
  mockedUseMediaQuery.mockReturnValue(themeType === 'dark' ? true : false)
  const theme = getTheme()
  expect(theme.palette.type).toBe(themeType)
})
