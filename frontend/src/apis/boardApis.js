import ENDPOINTS from '~/const/endpoints'
import axiosClient from './axiosClient'

/* Board */

export const getListBoard = async () => {
  const res = await axiosClient.get(ENDPOINTS.BOARDS)
  return res.data
}

export const getBoardDetailsAPI = async (boardId) => {
  const res = await axiosClient.get(`${ENDPOINTS.BOARDS}/${boardId}`)
  return res.data
}

export const postUpdateBoardAPI = async (boardId, updateData) => {
  const res = await axiosClient.put(`${ENDPOINTS.BOARDS}/${boardId}`, updateData)
  return res.data
}

export const postMoveCardBetweenDifferentColumnsAPI = async (updateData) => {
  const res = await axiosClient.put(`${ENDPOINTS.BOARDS}/supports/moving-card`, updateData)
  return res.data
}

/* Column */

export const postCreateNewColumnAPI = async (newColumnData) => {
  const res = await axiosClient.post(`${ENDPOINTS.COLUMNS}`, newColumnData)
  return res.data
}

export const postUpdateColumnAPI = async (ColumnId, updateData) => {
  const res = await axiosClient.put(`${ENDPOINTS.COLUMNS}/${ColumnId}`, updateData)
  return res.data
}

/* Card */

export const postCreateNewCardAPI = async (newCardData) => {
  const res = await axiosClient.post(`${ENDPOINTS.CARDS}`, newCardData)
  return res.data
}

export const postUpdateCardAPI = async (cardId, updateData) => {
  const res = await axiosClient.put(`${ENDPOINTS.CARDS}/${cardId}`, updateData)
  return res.data
}
