import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import { toast } from 'react-toastify'
import StyledInputBase from '~/components/AppBar/Menu/StyledInputBase'
import { APP_STYLE } from '~/const/common'
import Column from './Column/Column'

const ListColumns = (props) => {
  const { columns, createNewColumn, createNewCard } = props
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter	column title')
      return
    }

    const newColumn = {
      title: newColumnTitle
    }

    await createNewColumn(newColumn)
    setNewColumnTitle('')
    toggleOpenNewColumnForm()
  }

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
          <Column column={column} createNewCard={createNewCard} key={column._id} />
        ))}{' '}
        <Box
          maxWidth="250px"
          minWidth="250px"
          height="fit-content"
          mx={2}
          sx={{
            bgcolor: (theme) => (theme.palette.mode === APP_STYLE.DARK ? '#33364380' : '#ebecf080'),
            borderRadius: '6px'
          }}
        >
          {!openNewColumnForm ? (
            <Button
              fullWidth
              variant="text"
              startIcon={<NoteAddIcon />}
              color="inherit"
              sx={{ justifyContent: 'flex-start', pl: 2, py: 1 }}
              onClick={toggleOpenNewColumnForm}
            >
              Add new column
            </Button>
          ) : (
            <Box display="flex" flexDirection="column">
              <StyledInputBase
                type="text"
                placeholder="Column name..."
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                autoFocus
                // onBlur={toggleOpenNewColumnForm}
                endAdornment={
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => {
                      toggleOpenNewColumnForm()
                      setNewColumnTitle('')
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
                sx={{ pr: '8px' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={addNewColumn}
                sx={{ textAlign: 'left' }}
              >
                Add Column
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
