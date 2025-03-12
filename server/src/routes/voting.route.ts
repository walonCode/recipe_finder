import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createVote, getAllUserVote, getAllVote, deleteVote } from "../controllers/voting.controller"

export const voteRouter = Router()

voteRouter.route('/').post(authMiddleware, createVote).get(getAllVote)
voteRouter.route('/user').get(authMiddleware,getAllUserVote)
voteRouter.route('/:id').delete(authMiddleware,deleteVote)