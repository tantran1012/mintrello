import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import TrelloIcon from '~/assets/trello.svg?react'
import ModeSelect from '../ModeSelect'
import ProfileMenu from './Menu/ProfileMenu'
import Recent from './Menu/Recent'
import SearchBar from './Menu/SearchBar'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Workspaces from './Menu/Workspaces'

const drawerWidth = 240

const TrelloAppBar = (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
      <Box display="flex" flexDirection="column" gap={2} px="8px">
        <Box display="flex" justifyContent="center">
          <IconButton size="large" edge="start" color="inherit">
            <SvgIcon fontSize="small" component={TrelloIcon} inheritViewBox />
          </IconButton>
          <Typography textAlign="center" variant="h6" sx={{ my: 2 }}>
            Trello
          </Typography>
        </Box>
        <SearchBar />
        <Divider />
        <Workspaces />
        <Recent />
        <Starred />
        <Templates />
        <Button startIcon={<LibraryAddOutlinedIcon />} color="inherit" variant="text" size="large">
          Create
        </Button>
      </Box>
      <ModeSelect sx={{ alignSelf: 'center' }} />
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <AppBar position="static" sx={{ overflowX: 'auto' }}>
      <Toolbar display="flex" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" flexDirection="row" gap={1} width="100%">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            size="large"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
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
          <Box alignItems="center" flexDirection="row" gap={1} display={{ xs: 'none', md: 'flex' }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button
              startIcon={<LibraryAddOutlinedIcon />}
              color="inherit"
              variant="text"
              size="large"
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="row" gap={1}>
          <SearchBar display={{ xs: 'none', md: 'flex' }} />
          <ModeSelect display={{ xs: 'none', md: 'flex' }} color="#ffffff" />
          <IconButton edge="start" color="inherit" sx={{ ml: 1, mr: 1 }}>
            <Tooltip title="Notification">
              <Badge variant="dot" color="warning">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </Tooltip>
          </IconButton>
          <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
            <Tooltip title="Help">
              <HelpOutlineOutlinedIcon />
            </Tooltip>
          </IconButton>
          <ProfileMenu />
        </Box>
      </Toolbar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  )
}

export default TrelloAppBar
