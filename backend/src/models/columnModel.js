import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE, validateSchema } from '~/utils/validators'
// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELD = ['_id', 'boardId', 'createdAt']

const createNew = async (data) => {
  try {
    const validData = await validateSchema(COLUMN_COLLECTION_SCHEMA, data)
    const newValidData = {
      ...validData,
      boardId: new ObjectId(validData.boardId)
    }
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(newValidData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const pushCardOrderIds = async (card) => {
  try {
    return await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(card.columnId) },
        { $push: { cardOrderIds: new ObjectId(card._id) } },
        { returnDocument: 'after' }
      )
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (columnId, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })
    if (updateData.cardOrderIds) {
      updateData.cardOrderIds = updateData.cardOrderIds.map((id) => new ObjectId(id))
    }
    return await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(columnId) },
        { $set: updateData },
        { returnDocument: 'after' }
      )
  } catch (error) {
    throw new Error(error)
  }
}

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  pushCardOrderIds,
  update
}
