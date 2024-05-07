import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { generatePlaceholderCard, mapOrder } from '~/utils'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import ListColumns from './ListColumns/ListColumns'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'column',
  CARD: 'card'
}

const BoardContent = (props) => {
  const [orderedColumns, setOrderedColumns] = useState([])

  //Cùng 1 thời điểm chỉ có 1 item kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  const { board } = props

  const lastOverId = useRef(null)

  //yêu cầu drag 10px mới kích hoạt event, fix khi click cũng nhận event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 100 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    //cài dữ liệu
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      //Tìm vị trí (index) của over Card trong column đích
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      // Logic tính toán "cardIndex" mới (trên hoặc dưới overCard)
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

      if (nextActiveColumn) {
        //Xóa card ở column active (column cũ)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        //Thêm placeholder-card nếu column rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards.push(generatePlaceholderCard(nextActiveColumn))
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }

      if (nextOverColumn) {
        //Kiểm tra card có tồn tại ở overColumn chưa. Nếu có thì phải xóa trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        // const rebuild_activeDraggingCardData = {
        //   ...activeDraggingCardData,
        //   columnId: nextOverColumn._id
        // }
        //thêm card đang kéo vào overColumn ở vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        })
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_placeholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }

      return nextColumns
    })
  }

  //Trigger khi bắt đầu kéo (drag) một phần tử
  const handleDragStart = (event) => {
    const { active } = event
    setActiveDragItemId(active?.id)
    setActiveDragItemType(
      active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(active?.data?.current)

    if (active?.data?.current?.columnId)
      setOldColumnWhenDraggingCard(findColumnByCardId(active?.id))
  }

  // trigger trong quá trình kéo (drag) một phần tử
  const handleDragOver = (event) => {
    //Không làm gì nếu kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //Nếu drag card thì xử lý để drag qua lại giữa các column
    const { active, over } = event

    //nếu kéo linh tinh (không tồn tại over hoặc active) thì return
    if (!over || !active) return

    //activeDraggingCard: card đang kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    //overCard là card đang tương tác trên hoặc dưới so với card đang được kéo
    const { id: overCardId } = over

    //Tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // trigger sau khi kéo (drag) một phần tử => thả (drop)
  const handleDragEnd = (event) => {
    const { active, over } = event

    //nếu kéo linh tinh (không tồn tại over hoặc active) thì return
    if (!over || !active) return

    // Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //activeDraggingCard: card đang kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      //overCard là card đang tương tác trên hoặc dưới so với card đang được kéo
      const { id: overCardId } = over

      //Tìm 2 column theo cardId
      const activeColumn = oldColumnWhenDraggingCard
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if (activeColumn._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        //Lấy vị trí cũ từ active
        const oldCardIndex = activeColumn?.cards?.findIndex((c) => c._id === activeDragItemId)

        //Lấy vị trí mới từ over
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId)

        //Dùng arrayMove để sắp xếp array ban đầu
        const dndOrderedCards = arrayMove(activeColumn?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find((c) => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((c) => c._id)
          return nextColumns
        })
      }
    }

    // Xử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //Lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id)

        //Lấy vị trí mới từ over
        const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

        //Dùng arrayMove để sắp xếp array ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        // xử lý gọi API
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

        // cập nhật state sau khi kéo để render
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  //TODO: bổ sung tính năng move column, move card bằng nút bấm sau khi hoàn thành toàn bộ

  //Animation khi thả (drop) phần tử
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  //custom thuật toán va chạm
  //args = arguments
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return closestCorners({ ...args })

      // Tìm các điểm giao nhau, va chạm - intersections với con trỏ
      const pointerIntersections = pointerWithin(args)

      // nếu không có điểm va chạm (kéo ra khỏi khu vực kéo thả) thì không làm gì cả
      if (!pointerIntersections?.length) return

      // // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây
      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args)

      // Tìm overId đầu tiên trong đám pointerIntersections ở trên
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find((column) => column.id === overId)
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      //nếu overId là null thì trả về mảng rỗng - tránh bug crash
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // Nếu chỉ dùng closestCorners sẽ bị bug flickering + sai dữ liệu
      collisionDetection={closestCorners}
      // collisionDetection={collisionDetectionStrategy}
    >
      <Box width="100%" height={(theme) => theme.trello.boardContentHeight} p="10px 0">
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
            <Column column={activeDragItemData} />
          ) : (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
