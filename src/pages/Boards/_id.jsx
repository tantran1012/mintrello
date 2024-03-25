import Container from '@mui/material/Container'
import TrelloAppBar from '~/components/AppBar/AppBar'
import { APP_STYLE } from '~/const/common'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

const Board = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        bgcolor: '#2980b9',
        background:
          'linear-gradient(215deg, #71b073 29.9%, #2776aa 80%), linear-gradient(304deg, rgba(255, 101, 53, 0.4) 24.9%, #aa2743 91%), linear-gradient(10deg, #b1c9d8 19.9%, #2776aa 50%), linear-gradient(145deg, #f4df26 15.9%, #ff1b9a 40%)',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: (theme) =>
          theme.palette.mode === APP_STYLE.DARK ? 'hard-light' : 'screen',
        height: '100vh'
      }}
    >
      <TrelloAppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
