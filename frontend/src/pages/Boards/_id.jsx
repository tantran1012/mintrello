import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

const Board = () => {
  const [board, setBoard] = useState(null)
  const { boardId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    // const boardId = '66602f13d822b12ecb2b3261'
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        board.columns.forEach((column) => {
          if (isEmpty(column.cards)) {
            const phdCard = generatePlaceholderCard(column)
            column.cards = [phdCard]
            column.cardOrderIds[phdCard._id]
          }
        })
        setBoard(board)
      })
      .catch((error) => navigate('/404'))
  }, [])
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({ ...newColumnData, boardId: board._id })
    const newBoard = { ...board }

    const phdCard = generatePlaceholderCard(createdColumn)
    createdColumn.cards = [phdCard]
    createdColumn.cardOrderIds[phdCard._id]

    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({ ...newCardData, boardId: board._id })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }
  return (
    <>
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
    </>
  )
}

export default Board
