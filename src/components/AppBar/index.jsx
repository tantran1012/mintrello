import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import TrelloIcon from '~/assets/trello.svg?react'
import ModeSelect from '../ModeSelect'
import ProfileMenu from './Menu/ProfileMenu'
import Recent from './Menu/Recent'
import SearchBar from './Menu/SearchBar'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Workspaces from './Menu/Workspaces'

const TrelloAppBar = () => {
  return (
    <AppBar color="inherit" position="static" sx={{ overflowX: 'auto' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" flexDirection="row" gap={1} width="100%">
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer">
            <AppsIcon fontSize="small" />
          </IconButton>
          <Box display="flex" alignItems="center" flexDirection="row">
            <IconButton size="large" edge="start" color="inherit">
              <SvgIcon fontSize="small" component={TrelloIcon} inheritViewBox />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Trello
            </Typography>
          </Box>
          <Box display={{ xs: 'none', lg: 'flex' }} flexDirection="row">
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined" size="large">
              Create
            </Button>
          </Box>
        </Box>
        <Box display={{ xs: 'none', sm: 'flex' }} alignItems="center">
          <SearchBar />
          <ModeSelect />
          <IconButton edge="start" color="inherit" sx={{ ml: 1, mr: 1 }}>
            <Tooltip title="Notification">
              <Badge variant="dot" color="error">
                <NotificationsNoneOutlinedIcon color="primary" />
              </Badge>
            </Tooltip>
          </IconButton>
          <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
            <Tooltip title="Help">
              <HelpOutlineOutlinedIcon color="primary" />
            </Tooltip>
          </IconButton>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TrelloAppBar
