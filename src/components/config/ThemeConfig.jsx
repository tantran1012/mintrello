import CssBaseline from '@mui/material/CssBaseline'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material/styles'
// Create a theme instance.

const ThemeConfig = ({ children }) => {
  const theme = extendTheme({
    trello: {
      appBarHeight: '48px',
      boardBarHeight: '58px'
    },
    colorSchemes: {
      light: {
        palette: {
          primary: teal,
          secondary: deepOrange
        }
      },
      dark: {
        palette: {
          primary: cyan,
          secondary: orange
        }
      }
    }
    // ...other properties
  })

  return (
    <>
      {/* <ToastContainer autoClose={5000} limit={3} pauseOnHover position="bottom-right" /> */}
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </>
  )
}
export default ThemeConfig
