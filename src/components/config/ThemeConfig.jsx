import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material/styles'

const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - 64px - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const ThemeConfig = ({ children }) => {
  const theme = extendTheme({
    trello: {
      boardBarHeight: BOARD_BAR_HEIGHT,
      boardContentHeight: BOARD_CONTENT_HEIGHT,
      columnHeaderHeight: COLUMN_HEADER_HEIGHT,
      columnFooterHeight: COLUMN_FOOTER_HEIGHT
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
            },
            '*::-webkit-scrollbar-track': {
              margin: '0 8px 0 16px'
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
