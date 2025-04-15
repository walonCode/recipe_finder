"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Globe, Clock, Utensils, ChefHat, Plus } from "lucide-react"
import RatingAndVotingForm from "../Forms/RatingAndVoting/RatingAndVotingForm"
import AddStep from "../Forms/Food/AddStep"
import StepsList from "./StepList"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { selectFoodById } from "@/core/store/features/food/foodSlice"
import { selectAllStep } from "@/core/store/features/step/stepSlice"
import { useAppSelector } from "@/core/hooks/storeHook"
import { Food,} from "@/core/types/types"

const FoodDetails = () => {
  const { id } = useParams()
  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState(false)
  

  const selectedFood = useAppSelector(state => selectFoodById(state, id as string)) as Food
  const allSteps = useAppSelector(selectAllStep) 
  const filterSteps = allSteps.filter(step => step.foodId === id)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main content - 2/3 width on medium screens and up */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl font-bold">{selectedFood?.name}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>Origin: {selectedFood?.origin}</span>
                    {selectedFood?.createdAt && (
                      <>
                        <Clock className="h-4 w-4 ml-4 mr-1" />
                        <span>Added: {new Date(selectedFood?.createdAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <ChefHat className="h-3 w-3" />
                    <span>{selectedFood?.username}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Utensils className="h-5 w-5 mr-2" />
                Ingredients
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedFood?.ingredient?.map((ingredient, index) => (
                  <div key={index} className="flex items-center p-2 rounded-md bg-muted/50">
                    <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="original">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="original">Original Recipe</TabsTrigger>
                {/* <TabsTrigger value="contributed">Community Contributions</TabsTrigger> */}
              </TabsList>
              <Button size="sm" onClick={() => setIsAddStepModalOpen(true)} className="flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add Steps
              </Button>
            </div>

            <TabsContent value="original">
              <StepsList foodId={selectedFood?._id} isSimpleSteps={true} />
            </TabsContent>

            <TabsContent value="contributed">
              {filterSteps.length > 0 ? (
                <StepsList foodId={"fjfkjkfkd"} isSimpleSteps={false} />
              ) : (
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-muted-foreground">No community contributions yet. Be the first to add steps!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on medium screens and up */}
        <div className="space-y-6">
          <RatingAndVotingForm id={id as string}/>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About this Recipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ingredients:</span>
                  <span className="font-medium">{selectedFood?.ingredient?.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Steps:</span>
                  <span className="font-medium">{Array.isArray(selectedFood?.steps) ? selectedFood?.steps?.length : 0}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-muted-foreground">Community Contributions:</span>
                  <span className="font-medium">{selectedFood?.steps?.length}</span>
                </div> */}
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Rating:</span>
                  <span className="font-medium">{selectedFood?.ratings?.length.toFixed(1)} / 5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Ratings:</span>
                  <span className="font-medium">{selectedFood?.ratings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Likes:</span>
                  <span className="font-medium">{selectedFood?.votes?.filter((vote) => vote === "likes").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dislikes:</span>
                  <span className="font-medium">{selectedFood?.votes?.filter((vote) => vote === "dislikes").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Step Modal */}
      {isAddStepModalOpen && (
        <AddStep id={id as string}/>
      )}
    </div>
  )
}

export default FoodDetails

