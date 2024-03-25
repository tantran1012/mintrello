import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'

const ListColumns = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      overflow="auto hidden"
      sx={{ '&::-webkit-scrollbar-track': { m: 2 } }}
    >
      <Column />
      <Box
        maxWidth="200px"
        minWidth="200px"
        height="fit-content"
        mx={2}
        sx={{ bgcolor: '#00000033', borderRadius: '6px' }}
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
  )
}

export default ListColumns
