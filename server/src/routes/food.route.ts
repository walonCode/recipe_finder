import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createFood,getAllFoods,getAllUserFoods,deleteFood,updateFood }  from "../controllers/food.controller"


export const foodRouter = Router()



foodRouter.route('/').post(authMiddleware,createFood).get(getAllFoods)
foodRouter.route('/user').get(authMiddleware,getAllUserFoods)
foodRouter.route('/:id').delete(authMiddleware,deleteFood).patch(updateFood)