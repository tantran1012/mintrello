import Container from '@mui/material/Container'
import TrelloAppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <TrelloAppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
