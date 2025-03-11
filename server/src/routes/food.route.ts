import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createFood,getAllFoods,getAllUserFoods,deleteFood,updateFood }  from "../controllers/food.controller"


export const foodRouter = Router()



foodRouter.route('/create').post(authMiddleware,createFood)
foodRouter.route('/').get(getAllFoods)
foodRouter.route('/user').get(authMiddleware,getAllUserFoods)
foodRouter.route('/delete/:id').delete(authMiddleware,deleteFood)
foodRouter.route('/update/:id').patch(updateFood)