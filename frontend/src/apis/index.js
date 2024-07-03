import axios from 'axios'
import { API_ROOT } from '~/const/common'

/* Board */

export const fetchListBoard = async () => {
  const res = await axios.get(`${API_ROOT}/v1/boards`)
  return res.data
}

export const fetchBoardDetailsAPI = async (boardId) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return res.data
}

/* Column */

export const createNewColumnAPI = async (newColumnData) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return res.data
}

/* Card */

export const createNewCardAPI = async (newCardData) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return res.data
}
