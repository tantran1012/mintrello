import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = (props) => {
  const [orderedColumns, setOrderedColumns] = useState([])
  const { board } = props

  //yêu cầu drag 10px mới kích hoạt event, fix khi click cũng nhận event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 100 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const handleDragEnd = (event) => {
    const { active, over } = event

    //nếu kéo linh tinh (không tồn tại over) thì return
    if (!over) return

    if (active.id !== over.id) {
      //Lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)

      //Lấy vị trí mới từ over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

      //Dùng arrayMove để sắp xếp array ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // xử lý gọi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      // cập nhật state sau khi kéo để render
      setOrderedColumns(dndOrderedColumns)
    }
  }

  //TODO: bổ sung tính năng move column, move card bằng nút bấm sau khi hoàn thành toàn bộ

  useEffect(() => {
    //cài dữ liệu
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box width="100%" height={(theme) => theme.trello.boardContentHeight} p="10px 0">
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
