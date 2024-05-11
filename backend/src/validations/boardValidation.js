import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    //trim phải đi cùng với strict
    title: Joi.string().required().min(3).max(64).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // "abortEarly: false" để trả về tất cả lỗi validation
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const boardValidation = {
  createNew
}
