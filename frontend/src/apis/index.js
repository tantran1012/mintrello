import axios from 'axios'
import { API_ROOT } from '~/const/common'

export const fetchBoardDetailsAPI = async (boardId) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return res.data
}
