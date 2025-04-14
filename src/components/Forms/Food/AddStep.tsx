"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Minus, List } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Alert, AlertDescription } from "../../ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"
import { addStep,getAllSteps } from "@/core/store/features/step/stepSlice"
import { useAppDispatch } from "@/core/hooks/storeHook"
import { getAllFood } from "@/core/store/features/food/foodSlice"

const AddStep = () => {
  const [step, setStep] = useState<string[]>([""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const dispatch = useAppDispatch()

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...step]
    newSteps[index] = value
    setStep(newSteps)
  }


  const [isOpen,setIsOpen] = useState(true)
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  const addStepField = () => {
    setStep([...step, ""])
  }

  const removeStep = (index: number) => {
    if (step.length > 1) {
      const newSteps = step.filter((_, i) => i !== index)
      setStep(newSteps)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const action = await dispatch(addStep({step}))
      if(addStep.fulfilled.match(action)){
        setSuccess("Steps added successfully")
        await dispatch(getAllSteps())
        await dispatch(getAllFood())
        onClose()
      }
    } catch (error) {
      setError("Error adding steps. Please try again.")
      console.error("Error adding steps:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Preparation Steps</DialogTitle>
          <DialogDescription>Add the steps to prepare this dish. Be clear and concise.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {step.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <Label htmlFor={`step-${index}`} className="sr-only">
                  Step {index + 1}
                </Label>
                <div className="relative flex-grow">
                  <List className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id={`step-${index}`}
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="pl-10"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeStep(index)}
                  disabled={step.length === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addStepField} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Step
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="my-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="my-2 bg-green-50 text-green-700 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding Steps..." : "Add Steps"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddStep

