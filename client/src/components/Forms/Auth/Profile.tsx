import { useState} from "react"
import { Calendar, Mail, MapPin, Star, ThumbsUp, ThumbsDown, Utensils, Clock, ChevronRight, Globe } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { ScrollArea } from "../../ui/scroll-area"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { Food, Rating, User, Vote } from "../../../lib/types"







const Profile = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [ratings, setRatings] = useState<Rating[]>([])
  const [votes, setVotes] = useState<Vote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const token = Cookies.get("userToken") as string
  const decodedUser = jwtDecode(token) as User



  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !decodedUser) {
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
                <AvatarImage/>
                <AvatarFallback className="text-2xl">{decodedUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{decodedUser.username}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span>{decodedUser.email}</span>
                  </Badge>
                  {decodedUser.address && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{decodedUser.address}</span>
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {new Date(decodedUser.createdAt).toLocaleDateString()}</span>
                  </Badge>
                </div>
              </div>

              {decodedUser.bio && <p className="text-muted-foreground">{decodedUser.bio}</p>}

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                  <Utensils className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xl font-bold">{50}</span>
                  <span className="text-xs text-muted-foreground">Recipes</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                  <Star className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xl font-bold">{45}</span>
                  <span className="text-xs text-muted-foreground">Ratings</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                  <ThumbsUp className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xl font-bold">{20}</span>
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

