import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
import TrelloAppBar from '~/components/AppBar/AppBar'
import { APP_STYLE } from '~/const/common'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

const Board = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '663f983c8e13d35e3b6d6887'
    fetchBoardDetailsAPI(boardId).then((board) => setBoard(board))
  }, [])
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
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
