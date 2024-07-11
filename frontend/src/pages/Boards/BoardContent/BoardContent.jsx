import {
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { postMoveCardBetweenDifferentColumnsAPI } from '~/apis/boardApis'
import { MouseSensor, TouchSensor } from '~/customLibraries/dndKitSensor'
import {
  editBoard,
  editColumn,
  updateBoardDetail,
  updateColumnDetail
} from '~/redux/slices/BoardSlice'
import { generatePlaceholderCard } from '~/utils'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import ListColumns from './ListColumns/ListColumns'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'column',
  CARD: 'card'
}

const BoardContent = (props) => {
  //Cùng 1 thời điểm chỉ có 1 item kéo
  const activeDragItemType = useRef(null)
  const oldColumnWhenDraggingCard = useRef(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  const { board } = props
  const dispatch = useDispatch()
  const lastOverId = useRef(null)
  //yêu cầu drag 10px mới kích hoạt event, fix khi click cũng nhận event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 100 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const findColumnByCardId = (cardId) => {
    return board.columns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  /*
	Thêm phát hiện overId column vào collisionDetection
	chỉnh sửa dragOver và dragEnd khi move card:
	- dragOver cập nhật vị trí card, dragEnd gọi API
	*/
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    //Tìm vị trí (index) của over Card trong column đích
    const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

    // Logic tính toán "cardIndex" mới (trên hoặc dưới overCard)
    let newCardIndex
    // const isBelowOverItem =
    //   active.rect.current.translated &&
    //   active.rect.current.translated.top > over.rect.top + over.rect.height
    // const modifier = isBelowOverItem ? 1 : 0
    newCardIndex = overCardIndex >= 0 ? overCardIndex : overColumn?.cards?.length + 1

    const nextColumns = cloneDeep(board.columns)
    const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
    const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

    if (triggerFrom === 'handleDragEnd') {
      postMoveCardBetweenDifferentColumnsAPI({
        cardId: activeDraggingCardId,
        prevColumnId: nextActiveColumn._id,
        prevCardOrderIds: nextActiveColumn.cardOrderIds[0].includes('placeholder-card')
          ? []
          : nextActiveColumn.cardOrderIds,
        nextColumnId: nextOverColumn._id,
        nextCardOrderIds: nextOverColumn.cardOrderIds
      })
    } else {
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

        //thêm card đang kéo vào overColumn ở vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        })

        // Xóa placeholder-card nếu có
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_placeholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }
    }

    dispatch(editBoard({ columns: nextColumns }))
  }

  //Trigger khi bắt đầu kéo (drag) một phần tử
  const handleDragStart = (event) => {
    const { active } = event
    activeDragItemType.current = active?.data?.current?.columnId
      ? ACTIVE_DRAG_ITEM_TYPE.CARD
      : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    setActiveDragItemData(active?.data?.current)
    if (active?.data?.current?.columnId)
      oldColumnWhenDraggingCard.current = findColumnByCardId(active?.id)
  }

  // trigger trong quá trình kéo (drag) một phần tử
  const handleDragOver = (event) => {
    //Không làm gì nếu kéo column
    if (activeDragItemType.current === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //Nếu drag card thì xử lý để drag qua lại giữa các column
    const { active, over } = event
    console.log('🚀 ~ handleDragOver ~ over:', over)
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
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  // trigger sau khi kéo (drag) một phần tử => thả (drop)
  const handleDragEnd = (event) => {
    const { active, over } = event

    //nếu kéo linh tinh (không tồn tại over hoặc active) hoặc kéo về vị trí cũ thì return
    if (!over || !active || active.id === over.id) return

    // Xử lý kéo thả card
    if (activeDragItemType.current === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //activeDraggingCard: card đang kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      //overCard là card đang tương tác trên hoặc dưới so với card đang được kéo
      const { id: overCardId } = over

      //Tìm 2 column theo cardId
      const activeColumn = oldColumnWhenDraggingCard.current
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
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        //Lấy vị trí cũ từ active
        const oldCardIndex = activeColumn?.cards?.findIndex((c) => c._id === active.id)

        //Lấy vị trí mới từ over
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId)

        //Dùng arrayMove để sắp xếp array ban đầu
        const dndOrderedCards = arrayMove(activeColumn?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map((c) => c._id)
        dispatch(
          updateColumnDetail({
            columnsId: overColumn._id,
            updateData: { cardOrderIds: dndOrderedCardIds }
          })
        )

        // const nextColumns = cloneDeep(board.columns)
        // const targetColumn = nextColumns.find((c) => c._id === overColumn._id)
        // targetColumn.cards = dndOrderedCards
        // targetColumn.cardOrderIds = dndOrderedCardIds
        dispatch(
          editColumn({
            ...board.columns.find((c) => c._id === overColumn._id),
            cards: dndOrderedCards,
            cardOrderIds: dndOrderedCardIds
          })
        )
      }
    }

    // Xử lý kéo thả column
    if (activeDragItemType.current === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //Lấy vị trí cũ từ active
        const oldColumnIndex = board.columns.findIndex((c) => c._id === active.id)

        //Lấy vị trí mới từ over
        const newColumnIndex = board.columns.findIndex((c) => c._id === over.id)

        //Dùng arrayMove để sắp xếp array ban đầu
        const dndOrderedColumns = arrayMove(board.columns, oldColumnIndex, newColumnIndex)
        dispatch(editBoard({ columns: dndOrderedColumns }))

        // xử lý gọi API
        const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

        dispatch(
          updateBoardDetail({
            boardId: board._id,
            updateData: { columnOrderIds: dndOrderedColumnsIds }
          })
        )
      }
    }

    activeDragItemType.current = null
    oldColumnWhenDraggingCard.current = null
    setActiveDragItemData(null)
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
      if (activeDragItemType.current === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        return closestCorners({ ...args })

      // Tìm các điểm giao nhau, va chạm - intersections với con trỏ
      const pointerIntersections = pointerWithin(args)

      // nếu không có điểm va chạm (kéo ra khỏi khu vực kéo thả) thì không làm gì cả
      if (!pointerIntersections?.length) return

      // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây
      const intersections =
        pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args)

      // Tìm overId đầu tiên trong đám intersections ở trên
      let overId = getFirstCollision(intersections, 'id')
      if (overId) {
        const checkColumn = board.columns.find((column) => column._id === overId)
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
    [activeDragItemType.current, board.columns]
  )

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      // Nếu chỉ dùng closestCorners sẽ bị bug flickering + sai dữ liệu
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box width="100%" height={(theme) => theme.trello.boardContentHeight} p="10px 0">
        <ListColumns columns={board.columns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType.current && null}
          {activeDragItemType.current === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
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
