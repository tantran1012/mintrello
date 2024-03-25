import Box from '@mui/material/Box'
import Card from './Card/Card'
const ListCards = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      p={`0 5px`}
      m={`0 5px`}
      overflow="hidden auto"
      maxHeight={(theme) =>
        `calc(${theme.trello.boardContentHeight}
					- ${theme.trello.columnHeaderHeight}
					- ${theme.trello.columnFooterHeight}
					- ${theme.spacing(5)})`
      }
    >
      <Card />
      <Card />
      <Card />
      <Card />
    </Box>
  )
}

export default ListCards
