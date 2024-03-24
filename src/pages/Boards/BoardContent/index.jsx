import Box from '@mui/material/Box'

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        // height: (theme) =>
        //   `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      board content
    </Box>
  )
}

export default BoardContent
