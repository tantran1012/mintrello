import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { postUpdateBoardAPI, postUpdateCardAPI, postUpdateColumnAPI } from '~/apis/boardApis'
// import presentationApi from '~/apis/presentationApi';

// -----------------------------
export const updateBoardDetail = createAsyncThunk(
  'board/updateBoardDetail',
  async ({ boardId, updateData }, thunkAPI) => {
    try {
      const res = await postUpdateBoardAPI(boardId, updateData)
      thunkAPI.dispatch(editBoard(res))
    } catch (error) {
      toast.error('Failed to update board details')
    }
  }
)

export const updateColumnDetail = createAsyncThunk(
  'board/updateColumnDetail',
  async ({ columnsId, updateData }, thunkAPI) => {
    try {
      const res = await postUpdateColumnAPI(columnsId, updateData)
      thunkAPI.dispatch(editColumn(res))
    } catch (error) {
      toast.error('Failed to update column details')
    }
  }
)

export const updateCardDetail = createAsyncThunk(
  'board/updateCardDetail',
  async ({ cardId, updateData }, thunkAPI) => {
    try {
      const res = await postUpdateCardAPI(cardId, updateData)
      console.log(res)
      // thunkAPI.dispatch(editCard(res))
    } catch (error) {
      toast.error('Failed to update column details')
    }
  }
)
// -----------------------------
const initialState = {
  _id: null,
  title: '',
  description: '',
  type: '', //
  ownerIds: [],
  memberIds: [],
  columnOrderIds: [],
  columns: []
}

// -----------------------------
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    editBoard(state, action) {
      return { ...state, ...action.payload }
    },
    editColumn(state, action) {
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column._id === action.payload._id) {
            return { ...column, ...action.payload }
          } else return { ...column }
        })
      }
    },
    editCard(state, action) {
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column._id === action.payload.columnId) {
            column.cards.map((card) => {
              if (card._id === action.payload._id) {
                return { ...card, ...action.payload }
              } else return { ...card }
            })
          } else return { ...column }
        })
      }
    }
  }
})

const { reducer, actions } = boardSlice
export const { editBoard, editColumn, editCard } = actions
export default reducer
