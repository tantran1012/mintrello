import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import Card from './Card/Card'

const ListCards = (props) => {
  const { cards } = props
  return (
    <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>
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
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  )
}

export default ListCards
