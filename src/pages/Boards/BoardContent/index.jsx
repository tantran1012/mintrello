import Box from '@mui/material/Box'
import React from 'react'

const BoardContent = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        width: 1,
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      board content
    </Box>
  )
}

export default BoardContent
