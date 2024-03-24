import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
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
      // light: {
      //   palette: {
      //     primary: teal,
      //     secondary: deepOrange
      //   }
      // },
      // dark: {
      //   palette: {
      //     primary: cyan,
      //     secondary: orange
      //   }
      // }
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
              backgroundColor: grey[400],
              borderRadius: '8px'
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: grey[500],
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
          root: {
            color: 'inherit',
            fontSize: '0.875rem'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: '0.875rem',
            color: 'inherit',
            '.MuiOutlinedInput-notchedOutline': { borderColor: 'inherit' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'inherit' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'inherit' },
            '.MuiSvgIcon-root': { color: 'inherit' }
          }
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
