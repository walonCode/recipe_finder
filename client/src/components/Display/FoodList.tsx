import type React from "react"
import { useState} from "react"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import FoodCard from "./FoodCard"
import { selectAllFood } from "../../store/features/food/foodSlice"
import { useAppSelector } from "../../hooks/storeHook"

const FoodList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  

  const mockFoods = useAppSelector(selectAllFood)
  
  console.log(mockFoods)


  const filteredFoods = mockFoods.filter(
    (food) =>
      food.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(food.ingredient) &&
        food.ingredient.some((ing) => ing.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  console.log(JSON.stringify(filteredFoods))

  return (
    <div className=" min-h-screen container mx-auto px-4 py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
    </div>
  )
}

export default FoodList

