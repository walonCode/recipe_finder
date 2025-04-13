import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Loader2, Save, X, Plus, ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Alert, AlertDescription } from "../ui/alert"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"

interface FoodData {
  _id: string
  name: string
  origin: string
  ingredient: string[]
}

const EditFood = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [food, setFood] = useState<FoodData | null>(null)
  const [formData, setFormData] = useState<{
    name: string
    origin: string
    ingredient: string[]
  }>({
    name: "",
    origin: "",
    ingredient: [],
  })
  const [newIngredient, setNewIngredient] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setIsLoading(true)
        // In a real app, you would fetch from your API
        // const response = await axios.get(`/api/foods/${id}`)
        // const data = response.data

        // Mock data for development
        const data = {
          _id: id || "1234567890",
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
        }

        setFood(data)
        setFormData({
          name: data.name,
          origin: data.origin,
          ingredient: [...data.ingredient],
        })
      } catch (err) {
        console.error("Error fetching food:", err)
        setError("Failed to load food data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFood()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddIngredient = () => {
    if (newIngredient.trim() === "") return

    setFormData((prev) => ({
      ...prev,
      ingredient: [...prev.ingredient, newIngredient.trim()],
    }))
    setNewIngredient("")
  }

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredient: prev.ingredient.filter((_, i) => i !== index),
    }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddIngredient()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      setError("Name is required")
      return
    }

    if (!formData.origin.trim()) {
      setError("Origin is required")
      return
    }

    if (formData.ingredient.length === 0) {
      setError("At least one ingredient is required")
      return
    }

    try {
      setIsSaving(true)
      setError("")
      setSuccess("")

      // In a real app, you would submit to your API
      // await axios.put(`/api/foods/${id}`, formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Food updated successfully!")

      // Redirect after a short delay
      setTimeout(() => {
        navigate(`/foods/${id}`)
      }, 2000)
    } catch (err) {
      console.error("Error updating food:", err)
      setError("Failed to update food. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!food) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Food Not Found</h2>
        <p className="text-muted-foreground">The food item you're trying to edit could not be found.</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Recipe</CardTitle>
          <CardDescription>Update the details of your recipe</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Recipe Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter recipe name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                placeholder="Enter country or region of origin"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Ingredients</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[100px]">
                {formData.ingredient.length === 0 ? (
                  <p className="text-muted-foreground text-sm w-full text-center my-4">
                    No ingredients added yet. Add some below.
                  </p>
                ) : (
                  formData.ingredient.map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        className="ml-1 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {ingredient}</span>
                      </button>
                    </Badge>
                  ))
                )}
              </div>

              <div className="flex mt-2">
                <Input
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add new ingredient"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddIngredient} disabled={!newIngredient.trim()} className="ml-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Press Enter to add an ingredient</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <Separator />

          <CardFooter className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="min-w-[120px]">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default EditFood

