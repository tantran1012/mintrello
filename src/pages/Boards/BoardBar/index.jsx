import Box from '@mui/material/Box'
import React from 'react'

const BoardBar = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        width: 1,
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board Bar
    </Box>
  )
}

export default BoardBar
