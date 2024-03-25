import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import { Card as MuiCard } from '@mui/material'
import Button from '@mui/material/Button'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const Card = () => {
  return (
    <MuiCard sx={{ overflow: 'unset' }}>
      <CardActionArea>
        <CardMedia component="img" alt="Card 7" height="140" image="/avatar/avatar7.png" />
        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="body2">Card thuws nhat</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ pt: 0, px: 0.5 }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
