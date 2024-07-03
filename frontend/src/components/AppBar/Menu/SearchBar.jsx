import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { alpha, styled } from '@mui/material/styles'
import { useState } from 'react'
import StyledInputBase from '~/components/AppBar/Menu/StyledInputBase'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box {...props}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          collapse
          type="text"
          value={searchValue}
          placeholder="Search…"
          onChange={(e) => setSearchValue(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
          endAdornment={
            searchValue ? (
              <IconButton size="small" color="inherit" onClick={() => setSearchValue('')}>
                <CloseIcon fontSize="small" />
              </IconButton>
            ) : (
              ''
            )
          }
          sx={{ pr: '8px' }}
        />
      </Search>
    </Box>
  )
}

export default SearchBar
