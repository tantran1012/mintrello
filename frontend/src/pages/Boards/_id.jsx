import CircularProgress from '@mui/material/CircularProgress'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getBoardDetailsAPI } from '~/apis/boardApis'
import { editBoard } from '~/redux/slices/BoardSlice'
import { generatePlaceholderCard, mapOrder } from '~/utils'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

const Board = () => {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const board = useSelector((state) => state.board)

  useEffect(() => {
    getBoardDetailsAPI(boardId)
      .then((board) => {
        board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
        board.columns.forEach((column) => {
          if (isEmpty(column.cards)) {
            const phdCard = generatePlaceholderCard(column)
            column.cards = [phdCard]
            column.cardOrderIds[phdCard._id]
          } else {
            column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
          }
        })
        dispatch(editBoard(board))
      })
      .catch((error) => {
        navigate('/404')
        // throw error
      })
  }, [])

  if (!board._id) return <CircularProgress />
  return (
    <>
      <BoardBar board={board} />
      <BoardContent board={board} />
    </>
  )
}

export default Board
