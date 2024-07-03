import { Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Link = (props) => {
  const { children, ...rest } = props
  return (
    <MuiLink underline="none" component={RouterLink} {...rest}>
      {children}
    </MuiLink>
  )
}

export default Link
