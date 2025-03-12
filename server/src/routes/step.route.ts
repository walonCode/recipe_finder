import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createStep, deleteStep, getAllSteps } from "../controllers/step.controller"

export const stepRouter = Router()

stepRouter.route('/').post(authMiddleware, createStep).get(getAllSteps)
stepRouter.route('/:id').delete(deleteStep)