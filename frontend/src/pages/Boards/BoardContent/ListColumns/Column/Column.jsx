import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddCardIcon from '@mui/icons-material/AddCard'
import CloseIcon from '@mui/icons-material/Close'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { APP_STYLE } from '~/const/common'
import { mapOrder } from '~/utils'
import ListCards from './ListCards/ListCards'

const Column = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const { column, createNewCard } = props
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter	column title')
      return
    }
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    await createNewCard(newCardData)
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }

  const dndKitColumnStyle = {
    // touchAction: 'none', // Dành cho sensor default dạng pointerSensor

    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%', //Xem video 32 :>
    opacity: isDragging && 0.5
  }
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  return (
    <Box ref={setNodeRef} style={dndKitColumnStyle} {...attributes} component="div">
      <Box
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          maxHeight: '100%',
          height: 'fit-content',
          // bgcolor: 'background.default',
          bgcolor: (theme) => (theme.palette.mode === APP_STYLE.DARK ? '#333643' : '#ebecf0'),
          mb: 5,
          ml: 2,
          mr: '5px',
          overflow: 'auto',
          borderRadius: '6px',
          border: '1px solid transparent',
          '&:active	': { borderColor: (theme) => theme.palette.primary.main }
        }}
        {...listeners}
      >
        {/* Box column Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            py: 2,
            pl: 2,
            pr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <IconButton
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                size="small"
                color="inherit"
                onClick={handleClick}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new Card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Box list card */}
        <ListCards cards={orderedCards} />
        {/* Box column Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight + (openNewCardForm && '122px'),
            px: '10px',
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: openNewCardForm ? 'column' : 'row',
            alignItems: openNewCardForm ? 'unset' : 'center'
          }}
        >
          {!openNewCardForm ? (
            <Button
              variant="text"
              color="primary"
              onClick={toggleOpenNewCardForm}
              startIcon={<AddCardIcon />}
            >
              Add new Card
            </Button>
          ) : (
            <Box display="flex" gap={1} flexDirection="column" data-no-dnd="true">
              <Card sx={{ overflow: 'unset', height: 'unset', border: '1px solid transparent' }}>
                <InputBase
                  fullWidth
                  size="small"
                  placeholder="Card title..."
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  autoFocus
                  // onBlur={toggleOpenNewColumnForm}
                  endAdornment={
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => {
                        toggleOpenNewCardForm()
                        setNewCardTitle('')
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{ p: '7px 12px 7px 12px', fontSize: '0.9em' }}
                />
              </Card>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={addNewCard}
                sx={{ textAlign: 'left' }}
              >
                Add Card
              </Button>
            </Box>
          )}

          <Tooltip title="Drag to move" sx={{ mt: 1, alignSelf: openNewCardForm && 'flex-end' }}>
            <DragHandleIcon />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default Column
