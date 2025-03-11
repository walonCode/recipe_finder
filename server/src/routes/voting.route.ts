import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createVote, getAllUserVote, getAllFoodVote, deleteVote } from "../controllers/voting.controller"

export const voteRouter = Router()

voteRouter.route('/create').post(authMiddleware, createVote)
voteRouter.route('/user').get(authMiddleware,getAllUserVote)
voteRouter.route('/food/:foodId').get(getAllFoodVote)
voteRouter.route('/delete/:id').delete(authMiddleware,deleteVote)