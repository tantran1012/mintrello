import InputBase from '@mui/material/InputBase'
import { styled } from '@mui/material/styles'

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== 'collapse'
})(({ theme, collapse = false }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: collapse
      ? {
          width: '12ch',
          '&:focus': {
            width: '20ch'
          }
        }
      : {
          width: 'auto'
        }
  }
}))

export default StyledInputBase
