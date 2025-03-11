import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Calendar, Mail, MapPin, Star, ThumbsUp, ThumbsDown, Utensils, Clock, ChevronRight, Globe } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { ScrollArea } from "../../ui/scroll-area"

interface UserData {
  _id: string
  username: string
  email: string
  location?: string
  bio?: string
  avatarUrl?: string
  joinDate: string
  stats: {
    totalFoods: number
    totalRatings: number
    totalVotes: number
  }
}

interface Food {
  _id: string
  name: string
  origin: string
  ingredient: string[]
  createdAt: string
  ratings: { average: number; count: number }
  votes: { like: number; dislike: number }
}

interface Rating {
  _id: string
  foodId: string
  foodName: string
  rating: number
  createdAt: string
}

interface Vote {
  _id: string
  foodId: string
  foodName: string
  votesType: "like" | "dislike"
  createdAt: string
}

const Profile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState<UserData | null>(null)
  const [foods, setFoods] = useState<Food[]>([])
  const [ratings, setRatings] = useState<Rating[]>([])
  const [votes, setVotes] = useState<Vote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // const fetchUserData = async () => {
    //   try {
    //     setIsLoading(true)
    //     const [userResponse, foodsResponse, ratingsResponse, votesResponse] = await Promise.all([
    //       fetch(`/api/users/${userId}`),
    //       fetch(`/api/foods/user/${userId}`),
    //       fetch(`/api/ratings/user/${userId}`),
    //       fetch(`/api/voting/user/${userId}`)
    //     ])
    //
    //     const userData = await userResponse.json()
    //     const foodsData = await foodsResponse.json()
    //     const ratingsData = await ratingsResponse.json()
    //     const votesData = await votesResponse.json()
    //
    //     setUser(userData)
    //     setFoods(foodsData)
    //     setRatings(ratingsData)
    //     setVotes(votesData)
    //   } catch (err) {
    //     setError("Failed to load user data")
    //     console.error(err)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    //
    // fetchUserData()

    // Mock data for development
    setTimeout(() => {
      setUser({
        _id: "user123",
        username: "CulinaryExplorer",
        email: "chef@example.com",
        location: "New York, USA",
        bio: "Passionate home cook exploring flavors from around the world. I love experimenting with new ingredients and techniques.",
        avatarUrl: "",
        joinDate: "2022-03-15T10:30:00Z",
        stats: {
          totalFoods: 12,
          totalRatings: 47,
          totalVotes: 89,
        },
      })

      setFoods([
        {
          _id: "food1",
          name: "Spaghetti Bolognese",
          origin: "Italy",
          ingredient: ["Spaghetti", "Ground Beef", "Tomato Sauce", "Onion", "Garlic"],
          createdAt: "2023-01-10T14:30:00Z",
          ratings: { average: 4.5, count: 28 },
          votes: { like: 42, dislike: 3 },
        },
        {
          _id: "food2",
          name: "Chicken Tikka Masala",
          origin: "India",
          ingredient: ["Chicken", "Yogurt", "Tomato Sauce", "Spices", "Cream"],
          createdAt: "2023-02-05T09:15:00Z",
          ratings: { average: 4.8, count: 35 },
          votes: { like: 51, dislike: 2 },
        },
        {
          _id: "food3",
          name: "Beef Tacos",
          origin: "Mexico",
          ingredient: ["Tortillas", "Ground Beef", "Lettuce", "Tomato", "Cheese"],
          createdAt: "2023-03-22T16:45:00Z",
          ratings: { average: 4.2, count: 19 },
          votes: { like: 31, dislike: 5 },
        },
        {
          _id: "food4",
          name: "Pad Thai",
          origin: "Thailand",
          ingredient: ["Rice Noodles", "Shrimp", "Tofu", "Bean Sprouts", "Peanuts"],
          createdAt: "2023-04-18T11:20:00Z",
          ratings: { average: 4.6, count: 22 },
          votes: { like: 38, dislike: 1 },
        },
      ])

      setRatings([
        {
          _id: "rating1",
          foodId: "food101",
          foodName: "Beef Wellington",
          rating: 5,
          createdAt: "2023-05-12T10:30:00Z",
        },
        {
          _id: "rating2",
          foodId: "food102",
          foodName: "Mushroom Risotto",
          rating: 4,
          createdAt: "2023-05-15T14:45:00Z",
        },
        {
          _id: "rating3",
          foodId: "food103",
          foodName: "Chocolate Soufflé",
          rating: 5,
          createdAt: "2023-05-20T19:15:00Z",
        },
        {
          _id: "rating4",
          foodId: "food104",
          foodName: "Caesar Salad",
          rating: 3,
          createdAt: "2023-05-25T12:10:00Z",
        },
        {
          _id: "rating5",
          foodId: "food105",
          foodName: "Beef Stroganoff",
          rating: 4,
          createdAt: "2023-06-02T18:30:00Z",
        },
      ])

      setVotes([
        {
          _id: "vote1",
          foodId: "food201",
          foodName: "Lasagna",
          votesType: "like",
          createdAt: "2023-04-10T09:20:00Z",
        },
        {
          _id: "vote2",
          foodId: "food202",
          foodName: "Chicken Parmesan",
          votesType: "like",
          createdAt: "2023-04-15T13:40:00Z",
        },
        {
          _id: "vote3",
          foodId: "food203",
          foodName: "Beef Stir Fry",
          votesType: "dislike",
          createdAt: "2023-04-22T17:05:00Z",
        },
        {
          _id: "vote4",
          foodId: "food204",
          foodName: "Vegetable Curry",
          votesType: "like",
          createdAt: "2023-04-28T11:50:00Z",
        },
        {
          _id: "vote5",
          foodId: "food205",
          foodName: "Shrimp Scampi",
          votesType: "like",
          createdAt: "2023-05-05T20:15:00Z",
        },
      ])

      setIsLoading(false)
    }, 1000) // Simulate loading delay
  }, [userId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Error Loading Profile</h2>
        <p className="text-muted-foreground">{error || "User not found"}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* User Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback className="text-2xl">{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{user.username}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </Badge>
                  {user.location && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                  </Badge>
                </div>
              </div>

              {user.bio && <p className="text-muted-foreground">{user.bio}</p>}

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                  <Utensils className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xl font-bold">{user.stats.totalFoods}</span>
                  <span className="text-xs text-muted-foreground">Recipes</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                  <Star className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xl font-bold">{user.stats.totalRatings}</span>
                  <span className="text-xs text-muted-foreground">Ratings</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                  <ThumbsUp className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xl font-bold">{user.stats.totalVotes}</span>
                  <span className="text-xs text-muted-foreground">Votes</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="recipes" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="votes">Votes</TabsTrigger>
        </TabsList>

        {/* Recipes Tab */}
        <TabsContent value="recipes" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recipes Created</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {foods.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No recipes created yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <Card key={food._id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{food.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      {food.origin}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {food.ingredient.slice(0, 3).map((ingredient, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                      {food.ingredient.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{food.ingredient.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>
                          {food.ratings.average.toFixed(1)} ({food.ratings.count})
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                          {food.votes.like}
                        </span>
                        <span className="flex items-center">
                          <ThumbsDown className="h-4 w-4 mr-1 text-red-500" />
                          {food.votes.dislike}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{new Date(food.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1" asChild>
                      <a href={`/foods/${food._id}`}>
                        View Recipe
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Ratings Tab */}
        <TabsContent value="ratings" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Rating History</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {ratings.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No ratings given yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <ScrollArea className="h-[400px]">
                <div className="divide-y">
                  {ratings.map((rating) => (
                    <div key={rating._id} className="p-4 hover:bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{rating.foodName}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= rating.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/foods/${rating.foodId}`}>View Recipe</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </TabsContent>

        {/* Votes Tab */}
        <TabsContent value="votes" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Voting History</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {votes.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No votes given yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <ScrollArea className="h-[400px]">
                <div className="divide-y">
                  {votes.map((vote) => (
                    <div key={vote._id} className="p-4 hover:bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{vote.foodName}</h3>
                          <div className="flex items-center mt-1">
                            {vote.votesType === "like" ? (
                              <ThumbsUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <ThumbsDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className="ml-2 text-sm capitalize">{vote.votesType}d</span>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {new Date(vote.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/foods/${vote.foodId}`}>View Recipe</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile

