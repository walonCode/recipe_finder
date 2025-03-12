import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createRating, getAllFoodRating,getAllUserRating, deleteRating } from "../controllers/rating.controller"

export const ratingRouter = Router()

ratingRouter.route('/').post(authMiddleware, createRating)
ratingRouter.route('/user').get(authMiddleware,getAllUserRating)
ratingRouter.route('/food/:foodId').get(getAllFoodRating)
ratingRouter.route('/:id').delete(authMiddleware,deleteRating)