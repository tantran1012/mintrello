import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddCardIcon from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { APP_STYLE } from '~/const/common'
import { mapOrder } from '~/utils'
import ListCards from './ListCards/ListCards'

const Column = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { column } = props
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dndKitColumnStyle = {
    // touchAction: 'none', // Dành cho sensor default dạng pointerSensor

    transform: CSS.Translate.toString(transform),
    transition
  }
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  return (
    <Box
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
      {...listeners}
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        maxHeight: '100%',
        height: 'fit-content',
        // bgcolor: 'background.default',
        bgcolor: (theme) => (theme.palette.mode === APP_STYLE.DARK ? '#333643' : '#ebecf0'),
        mb: 5,
        ml: 2,
        borderRadius: '6px'
      }}
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
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Button variant="text" color="primary" startIcon={<AddCardIcon />}>
          Add new Card
        </Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column
