"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
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


const AddStep = () => {
  const [steps, setSteps] = useState<string[]>([""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = value
    setSteps(newSteps)
  }

  const foodId = ""
  const userId = ""
  const username = ""
  const [isOpen,setIsOpen] = useState(true)
  const onClose = () => {
    setIsOpen(!isOpen)
  }

  const addStep = () => {
    setSteps([...steps, ""])
  }

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index)
      setSteps(newSteps)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await axios.post("http://localhost:5000/api/steps", {
        foodId,
        step: steps.filter((step) => step.trim() !== ""), // Remove empty steps
        userId,
        username,
      })
      setSuccess("Steps added successfully!")
      console.log("Steps added:", response.data)
      // Reset form
      setSteps([""])
      // Close modal after a short delay
      setTimeout(() => {
        onClose()
      }, 2000)
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
            {steps.map((step, index) => (
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
                  disabled={steps.length === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addStep} className="w-full">
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

