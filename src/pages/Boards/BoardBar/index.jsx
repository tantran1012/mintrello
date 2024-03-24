import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
const BoardBar = () => {
  return (
    <Box
      p="8px"
      boxShadow={2}
      display="flex"
      justifyContent="space-between"
      sx={{
        overflowX: 'auto'
      }}
    >
      <Box display="flex" alignItems="center" flexDirection="row" gap={1}>
        <Chip
          icon={<DashboardIcon />}
          sx={{ px: '5px', border: 'none', borderRadius: '4px' }}
          label="Hello world"
          variant="outlined"
          clickable
        />
        <Chip
          icon={<VpnLockIcon />}
          sx={{ px: '5px', border: 'none', borderRadius: '4px' }}
          label="Public/Private workspace"
          variant="outlined"
          clickable
        />
        <Chip
          icon={<AddToDriveIcon />}
          sx={{ px: '5px', border: 'none', borderRadius: '4px' }}
          label="Add to Google Drive"
          variant="outlined"
          clickable
        />
        <Chip
          icon={<BoltIcon />}
          sx={{ px: '5px', border: 'none', borderRadius: '4px' }}
          label="Automation"
          variant="outlined"
          clickable
        />
        <Chip
          icon={<FilterListIcon />}
          sx={{ px: '5px', border: 'none', borderRadius: '4px' }}
          label="Filter"
          variant="outlined"
          clickable
        />
      </Box>
      <Box display="flex" alignItems="center" flexDirection="row" gap={1}>
        <Button variant="outlined" color="inherit" startIcon={<PersonAddOutlinedIcon />}>
          Invite
        </Button>
        <AvatarGroup
          sx={{
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              cursor: 'pointer',
              color: 'white',
              borderColor: 'white'
            }
          }}
          max={7}
        >
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src="./avatar/avatar1.jpg" />
          </Tooltip>
          <Tooltip title="Travis Howard">
            <Avatar alt="Travis Howard" src="./avatar/avatar2.jpg" />
          </Tooltip>
          <Tooltip title="Cindy Baker">
            <Avatar alt="Cindy Baker" src="./avatar/avatar3.png" />
          </Tooltip>
          <Tooltip title="Agnes Walker">
            <Avatar alt="Agnes Walker" src="./avatar/avatar4.jpg" />
          </Tooltip>
          <Tooltip title="Trevor Henderson">
            <Avatar alt="Trevor Henderson" src="./avatar/avatar5.jpg" />
          </Tooltip>
          <Tooltip title="Anh da den">
            <Avatar alt="Anh da den" src="./avatar/avatar6.png" />
          </Tooltip>
          <Tooltip title="Chi da trang">
            <Avatar alt="Chi da trang" src="./avatar/avatar7.png" />
          </Tooltip>
          <Tooltip title="MinhTan">
            <Avatar alt="MinhTan" src="./avatar/mint.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
