import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { APP_STYLE } from '~/const/common'
import Column from './Column/Column'

const ListColumns = (props) => {
  const { columns } = props
  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
      <Box
        width="100%"
        height="100%"
        display="flex"
        overflow="auto hidden"
        sx={{ '&::-webkit-scrollbar-track': { m: 2 } }}
      >
        {columns?.map((column) => (
          <Column column={column} key={column._id} />
        ))}
        <Box
          maxWidth="200px"
          minWidth="200px"
          height="fit-content"
          mx={2}
          sx={{
            bgcolor: (theme) => (theme.palette.mode === APP_STYLE.DARK ? '#33364380' : '#ebecf080'),
            borderRadius: '6px'
          }}
        >
          <Button
            fullWidth
            variant="text"
            startIcon={<NoteAddIcon />}
            color="inherit"
            sx={{ justifyContent: 'flex-start', pl: 2, py: 1 }}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
