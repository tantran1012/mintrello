import Box from '@mui/material/Box'
import { mapOrder } from '~/utils'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = (props) => {
  const { board } = props
  const orderedColumn = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box width="100%" height={(theme) => theme.trello.boardContentHeight} p="10px 0">
      <ListColumns columns={orderedColumn} />
    </Box>
  )
}

export default BoardContent
