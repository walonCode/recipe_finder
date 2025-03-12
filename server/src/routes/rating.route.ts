import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createRating, getAllRating,getAllUserRating, deleteRating } from "../controllers/rating.controller"

export const ratingRouter = Router()

ratingRouter.route('/').post(authMiddleware, createRating).get(getAllRating)
ratingRouter.route('/user').get(authMiddleware,getAllUserRating)
ratingRouter.route('/:id').delete(authMiddleware,deleteRating)