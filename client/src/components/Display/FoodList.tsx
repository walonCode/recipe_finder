"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import FoodCard from "./FoodCard"

interface Food {
  _id: string
  name: string
  origin: string
  ingredient: string[]
  steps: string[]
  votes: { like: number; dislike: number }
  ratings: { average: number; count: number }
  userId: string
  username: string
}

const mockFoods: Food[] = [
    {
      _id: "1234567890",
      name: "Spaghetti Bolognese",
      origin: "Italy",
      ingredient: ["Spaghetti", "Ground Beef", "Tomato Sauce", "Onion", "Garlic"],
      steps: ["Cook spaghetti according to package directions", "Brown ground beef in a pan", "Add tomato sauce and simmer"],
      votes: { like: 100, dislike: 20 },
      ratings: { average: 4.5, count: 50 },
      userId: "user123",
      username: "John Doe"
    },
    {
      _id: "2345678901",
      name: "Chicken Fajitas",
      origin: "Mexico",
      ingredient: ["Chicken Breast", "Bell Peppers", "Onion", "Tortillas", "Salsa"],
      steps: ["Slice chicken and bell peppers", "Cook in a pan with oil", "Serve with tortillas and salsa"],
      votes: { like: 80, dislike: 10 },
      ratings: { average: 4.2, count: 30 },
      userId: "user456",
      username: "Jane Doe"
    },
  ]


const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

//   useEffect(() => {
//     fetchFoods()
//   }, [])

  const fetchFoods = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await axios.get<Food[]>("http://localhost:5000/api/foods")
      setFoods(response.data)
    } catch (err) {
      setError("Failed to fetch foods. Please try again later.")
      console.error("Error fetching foods:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredFoods = mockFoods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.ingredient.some((ing) => ing.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sierra Leonean Cuisine Directory</h1>

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for recipes, origins, or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Loading recipes...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : filteredFoods.length === 0 ? (
        <div className="text-center">No recipes found. Try a different search term.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FoodList

