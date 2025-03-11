import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createStep, deleteStep, getAllFoodSteps } from "../controllers/step.controller"

export const stepRouter = Router()

stepRouter.route('/create').post(authMiddleware, createStep)
stepRouter.route('/food/:foodId').get(getAllFoodSteps)
stepRouter.route('/delete/:id').delete(deleteStep)