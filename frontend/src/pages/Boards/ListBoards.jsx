import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'
import { fetchListBoard } from '~/apis'
import Link from '~/components/Link'

const ListBoards = () => {
  const [listBoards, setListBoards] = useState([])
  useEffect(() => {
    fetchListBoard().then((list) => setListBoards(list))
  }, [])
  return (
    <Box display="flex" gap={2} margin={2} flexDirection="column">
      {listBoards.map((board) => {
        return (
          <Link to={`/boards/${board._id}`} key={board._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" color="primary">
                  {board.title}
                </Typography>
                <Typography variant="body2">{board.description}</Typography>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </Box>
  )
}

export default ListBoards
