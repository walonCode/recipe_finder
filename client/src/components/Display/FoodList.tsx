import type React from "react"
import { useState } from "react"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import FoodCard from "./FoodCard"
import { selectAllFood } from "../../store/features/food/foodSlice"
import { useAppSelector } from "../../hooks/storeHook"
import { Button } from "../ui/button"

const FoodList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const foodsPerPage = 6

  const mockFoods = useAppSelector(selectAllFood)
  
 

  const filteredFoods = mockFoods.filter(
    (food) =>
      food?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food?.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(food?.ingredient) &&
        food?.ingredient?.some((ing) => ing.toLowerCase().includes(searchTerm.toLowerCase()))),
  )


  // Pagination logic
  const indexOfLastFood = currentPage * foodsPerPage
  const indexOfFirstFood = indexOfLastFood - foodsPerPage
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood)
  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage)

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sierra Leonean Cuisine Directory</h1>
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for recipes, origins, or ingredients..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-10 pr-4 py-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFoods.map((food) => (
          <FoodCard key={food?._id} food={food} />
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-8">
          <Button
            className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="px-4 py-2 font-medium">Page {currentPage} of {totalPages}</span>
          <Button
            className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default FoodList
