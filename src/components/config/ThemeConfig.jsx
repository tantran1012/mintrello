import CssBaseline from '@mui/material/CssBaseline'
import { cyan, deepOrange, grey, orange, teal } from '@mui/material/colors'
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
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: grey[300],
              borderRadius: '8px'
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: teal[700],
              borderRadius: '8px'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none'
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
            fontSize: '0.875rem'
          })
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.light },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main }
            }
          })
        }
      }
    }
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
