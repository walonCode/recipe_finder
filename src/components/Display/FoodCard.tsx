import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Utensils, MapPin, Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Food } from "@/core/types/types"


const FoodCard = ({ food }:{food:Food}) => {
  return (
    <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{food.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {food.origin}
            </CardDescription>
          </div>
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${food.username}`} />
            <AvatarFallback>{food?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              {food.ingredient.slice(0, 5).map((ing, index) => (
                <Badge key={index} variant="secondary">
                  {ing}
                </Badge>
              ))}
              {food.ingredient.length > 5 && <Badge variant="secondary">+{food?.ingredient?.length - 5} more</Badge>}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Utensils className="h-4 w-4 mr-1" />
              <span>{food?.steps?.length} steps</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span>
                  {food?.ratings?.length} ({food?.ratings?.length})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                  <span>{food?.votes?.length}</span>
                </div>
                <div className="flex items-center">
                  <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                  <span>{food?.votes?.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/food/${food?._id}`}>View Recipe</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FoodCard

