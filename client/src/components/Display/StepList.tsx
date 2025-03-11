"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, User, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

interface Step {
  _id?: string
  step: string[]
  username: string
  userId: string
  createdAt?: string
}

interface StepsListProps {
  steps: string[] | Step[]
  isSimpleSteps?: boolean
}

const StepsList = ({ steps, isSimpleSteps = true }: StepsListProps) => {
  const [openStepSets, setOpenStepSets] = useState<Record<string, boolean>>({})

  const toggleStepSet = (id: string) => {
    setOpenStepSets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // If steps is just an array of strings (simple steps)
  if (isSimpleSteps) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Preparation Steps</CardTitle>
          <CardDescription>Follow these steps to prepare the dish</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4 list-decimal list-inside">
            {(steps as string[]).map((step, index) => (
              <li key={index} className="pl-2 py-2 border-b border-muted last:border-0">
                <span className="ml-2">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    )
  }

  // If steps is an array of Step objects (contributed steps)
  return (
    <div className="space-y-4">
      {(steps as Step[]).map((stepSet) => (
        <Collapsible
          key={stepSet._id || Math.random().toString()}
          open={openStepSets[stepSet._id || ""]}
          onOpenChange={() => toggleStepSet(stepSet._id || "")}
          className="border rounded-lg"
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Steps by {stepSet.username}</CardTitle>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {openStepSets[stepSet._id || ""] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CardDescription className="flex items-center gap-2 text-xs">
                <User className="h-3 w-3" />
                <span>{stepSet.username}</span>
                {stepSet.createdAt && (
                  <>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{new Date(stepSet.createdAt).toLocaleDateString()}</span>
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="pt-2">
                <ol className="space-y-3 list-decimal list-inside">
                  {stepSet.step.map((step, index) => (
                    <li key={index} className="pl-2 py-1.5 border-b border-muted last:border-0">
                      <span className="ml-2">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
              <CardFooter className="pt-0 pb-2">
                <Badge variant="outline" className="text-xs">
                  {stepSet.step.length} steps
                </Badge>
              </CardFooter>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  )
}

export default StepsList

