import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import { APP_STYLE } from '~/const/common'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="select-dark-light-mode"
        id="app-style"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{ '.MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 } }}
      >
        <MenuItem value={APP_STYLE.LIGHT} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LightModeIcon fontSize="small" /> Light
        </MenuItem>
        <MenuItem value={APP_STYLE.DARK} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DarkModeOutlinedIcon fontSize="small" /> Dark
        </MenuItem>
        <MenuItem value={APP_STYLE.SYSTEM} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsBrightnessIcon fontSize="small" /> System
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
