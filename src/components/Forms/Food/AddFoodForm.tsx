"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Minus, Utensils, MapPin, List } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Alert, AlertDescription } from "../../ui/alert"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card"
import { useRouter } from "next/navigation"
import { getAllFood } from "@/core/store/features/food/foodSlice"
import { useAppDispatch } from "@/core/hooks/storeHook"
import ImageView from "@/components/ImageView"
import { axiosInstance } from "@/core/api/axiosInstance"


const AddFoodForm = () => {
  const [name, setName] = useState("")
  const [origin, setOrigin] = useState("")
  const [ingredients, setIngredients] = useState<string[]>([""])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState<Record<string,string>>({})

  const dispatch = useAppDispatch()

  const router  = useRouter()

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ""])
  }

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index)
      setIngredients(newIngredients)
    }
  }

  const validateForm = () => {
    if(name.trim() === ""){
      setError((prev) => ({ ...prev, name: "Name is required"}))
    }
    if(origin.trim() === ""){
      setError((prev) => ({ ...prev, origin: "Origin is required"}))
    }
    if(ingredients.length === 0){
      setError((prev) => ({ ...prev, ingredients: "At least one ingredient is required"}))
    }
    if(ingredients.map((ing) => ing.trim()).includes("")){
      setError((prev) => ({ ...prev, ingredients: "At least one ingredient is required"}))
    }
    if(!image){
      setError((prev) => ({ ...prev, image: "Image is required"}))
    }
    
    return Object.keys(error).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      if(!validateForm()){
        setIsLoading(true)
        setError({})
        const formData = new FormData()
        formData.append("name", name)
        formData.append("origin", origin)
        formData.append("ingredients", JSON.stringify(ingredients))
        formData.append("image", image as File)
        const response = await axiosInstance.post('/food',formData)
        if(response.status === 201){
          setSuccess(true)
          await dispatch(getAllFood())
          router.push("/food")
        }
      }
    }catch(error){
      console.error(error)
      setError((prev) => ({...prev, axiosError:"Something went wrong"}))
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Food</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Food Name</Label>
              <div className="relative">
                <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter food name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-red-500 text-sm">{error.name}</p>
            </div>

            <ImageView onImageChange={setImage} error={error} />

            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="origin"
                  type="text"
                  placeholder="Enter food origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-red-500 text-sm">{error.origin}</p>
            </div>

            <div className="space-y-2">
              <Label>Ingredients</Label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="relative flex-grow">
                    <List className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addIngredient} className="w-full mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Ingredient
              </Button>
              <p className="text-red-500 text-sm">{error.ingredients}</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error.axiosError ? error.axiosError : " " }</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding Food..." : "Submit Food"}
          </Button>
        </CardFooter>
          </form>
        </CardContent>
        
      </Card>
    </div>
  )
}

export default AddFoodForm

