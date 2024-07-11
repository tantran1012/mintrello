import express from 'express'
import { boardController } from '~/controllers/boardController'
import { boardValidation } from '~/validations/boardValidation'

const Router = express.Router()

Router.route('/')
  .get(boardController.getListBoards)
  .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update)

Router.route('/supports/moving-card').put(
  boardValidation.MoveCardBetweenDifferentColumns,
  boardController.MoveCardBetweenDifferentColumns
)
export const boardRoute = Router
