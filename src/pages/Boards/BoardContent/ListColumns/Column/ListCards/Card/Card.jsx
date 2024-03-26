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

const Card = (props) => {
  const { card } = props

  const shouldShowCardAction =
    !!card?.memberIds.length || !!card?.comments.length || !!card?.attachments.length

  return (
    <MuiCard sx={{ overflow: 'unset' }}>
      <CardActionArea>
        {card?.cover && (
          <CardMedia component="img" alt={card.title} height="140" image={card?.cover} />
        )}
        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="body2">{card.title}</Typography>
        </CardContent>
      </CardActionArea>
      {shouldShowCardAction && (
        <CardActions sx={{ pt: 0, px: 0.5 }}>
          {!!card?.memberIds.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds.length}
            </Button>
          )}
          {!!card?.comments.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card?.comments.length}
            </Button>
          )}
          {!!card?.attachments.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
