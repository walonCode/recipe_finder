import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Globe, Clock, Utensils, ChefHat, Plus } from "lucide-react"
import RatingAndVotingForm from "../Forms/RatingAndVoting/RatingAndVotingForm"
import AddStep from "../Forms/Food/AddStep"
import StepsList from "./StepList"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { selectFoodById } from "../../store/features/food/foodSlice"
import { useAppSelector } from "../../hooks/storeHook"

interface Step {
  _id: string
  step: string[]
  username: string
  userId: string
  createdAt: string
}

interface Food {
  _id: string
  name: string
  origin: string
  ingredient: string[]
  steps: string[] | Step[]
  votes: { like: number; dislike: number }
  ratings: { average: number; count: number }
  userId: string
  username: string
  createdAt?: string
}

const FoodDetails = () => {
  const { id } = useParams()
  const [food, setFood] = useState<Food | null>(null)
  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState(false)
  const [contributedSteps, setContributedSteps] = useState<Step[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const selectedFood = useAppSelector(state => selectFoodById(state, id ?? ""))

  useEffect(() => {
    // Fetch food data from API
    // const fetchFood = async () => {
    //   try {
    //     setIsLoading(true)
    //     const response = await fetch(`/api/foods/${id}`)
    //     const data = await response.json()
    //     setFood(data)
    //
    //     // Fetch contributed steps
    //     const stepsResponse = await fetch(`/api/steps/food/${id}`)
    //     const stepsData = await stepsResponse.json()
    //     setContributedSteps(stepsData)
    //   } catch (error) {
    //     console.error("Error fetching food details:", error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // fetchFood()

    // Mock data for development
    setFood({
      _id: "1234567890",
      name: "Spaghetti Bolognese",
      origin: "Italy",
      ingredient: [
        "Spaghetti",
        "Ground Beef",
        "Tomato Sauce",
        "Onion",
        "Garlic",
        "Carrots",
        "Celery",
        "Red Wine",
        "Olive Oil",
        "Salt",
        "Pepper",
        "Parmesan Cheese",
      ],
      steps: [
        "Cook spaghetti according to package directions",
        "Brown ground beef in a pan",
        "Add chopped onions, carrots, and celery and sauté until soft",
        "Add garlic and cook for another minute",
        "Pour in red wine and let it reduce",
        "Add tomato sauce and simmer for at least 30 minutes",
        "Season with salt and pepper to taste",
        "Serve sauce over cooked spaghetti and top with grated parmesan",
      ],
      votes: { like: 100, dislike: 20 },
      ratings: { average: 4.5, count: 50 },
      userId: "user123",
      username: "John Doe",
      createdAt: "2023-05-15T10:30:00Z",
    })

    // Mock contributed steps
    setContributedSteps([
      {
        _id: "step1",
        step: [
          "Start by heating olive oil in a large pan",
          "Add finely chopped onions and sauté until translucent",
          "Add ground beef and cook until browned",
          "Add tomato paste and stir for 1-2 minutes",
          "Pour in red wine and let it reduce by half",
          "Add crushed tomatoes and simmer for 1-2 hours",
          "Cook spaghetti al dente and serve with the sauce",
        ],
        username: "ChefMaria",
        userId: "user456",
        createdAt: "2023-06-10T14:20:00Z",
      },
      {
        _id: "step2",
        step: [
          "Use a mix of ground beef and pork for more flavor",
          "Add a bay leaf and a piece of parmesan rind to the sauce while simmering",
          "Let the sauce rest overnight for better flavor development",
          "Reserve some pasta water to mix with the sauce for perfect consistency",
        ],
        username: "ItalianFoodLover",
        userId: "user789",
        createdAt: "2023-07-22T09:15:00Z",
      },
    ])

    setIsLoading(false)
  }, [id])

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )

  if (!food)
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Food not found</h2>
        <p className="text-muted-foreground">The requested food item could not be found.</p>
      </div>
    )

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
                <TabsTrigger value="contributed">Community Contributions</TabsTrigger>
              </TabsList>
              <Button size="sm" onClick={() => setIsAddStepModalOpen(true)} className="flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add Steps
              </Button>
            </div>

            <TabsContent value="original">
              <StepsList steps={selectedFood?.steps} isSimpleSteps={true} />
            </TabsContent>

            <TabsContent value="contributed">
              {contributedSteps.length > 0 ? (
                <StepsList steps={contributedSteps} isSimpleSteps={false} />
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
          <RatingAndVotingForm foodId={id}/>

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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Community Contributions:</span>
                  <span className="font-medium">{contributedSteps.length}</span>
                </div>
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
                  <span className="font-medium">{selectedFood?.votes.filter((vote) => vote === "likes").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dislikes:</span>
                  <span className="font-medium">{selectedFood?.votes.filter((vote) => vote === "dislikes").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Step Modal */}
      {isAddStepModalOpen && (
        <AddStep foodId={id}/>
      )}
    </div>
  )
}

export default FoodDetails

