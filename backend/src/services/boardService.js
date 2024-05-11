/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formater'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const result = await boardModel.createNew(newBoard)
    return await boardModel.findOneById(result.insertedId)
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
