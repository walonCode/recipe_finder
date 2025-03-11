import { useState, useEffect } from "react"
import axios from "axios"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Alert, AlertDescription } from "../../ui/alert"
import { Progress } from "../../ui/progress"


interface RatingStats {
  averageRating: number
  totalRatings: number
  ratingCounts: { [key: number]: number }
}

interface VotingStats {
  likes: number
  dislikes: number
}

const RatingAndVotingForm = () => {
  const [userRating, setUserRating] = useState<number | null>(null)
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null)
  const [ratingStats, setRatingStats] = useState<RatingStats | null>(null)
  const [votingStats, setVotingStats] = useState<VotingStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")


  const foodId = ""
  const userId = ""
  const username = ""

  useEffect(() => {
    fetchRatingAndVotingStats()
    fetchUserRatingAndVote()
  }, [foodId, userId])

  const fetchRatingAndVotingStats = async () => {
    try {
      const [ratingResponse, votingResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/ratings/stats/${foodId}`),
        axios.get(`http://localhost:5000/api/voting/stats/${foodId}`),
      ])
      setRatingStats(ratingResponse.data)
      setVotingStats(votingResponse.data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const fetchUserRatingAndVote = async () => {
    try {
      const [ratingResponse, votingResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/ratings/user/${foodId}/${userId}`),
        axios.get(`http://localhost:5000/api/voting/user/${foodId}/${userId}`),
      ])
      setUserRating(ratingResponse.data.rating)
      setUserVote(votingResponse.data.votesType)
    } catch (error) {
      console.error("Error fetching user rating and vote:", error)
    }
  }

  const handleRating = async (rating: number) => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      await axios.post("http://localhost:5000/api/ratings", {
        foodId,
        rating,
        userId,
        username,
      })
      setUserRating(rating)
      setSuccess("Rating submitted successfully!")
      fetchRatingAndVotingStats()
    } catch (error) {
      setError("Error submitting rating. Please try again.")
      console.error("Error submitting rating:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (voteType: "like" | "dislike") => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      await axios.post("http://localhost:5000/api/voting", {
        foodId,
        votesType: voteType,
        userId,
        username,
      })
      setUserVote(voteType)
      setSuccess("Vote submitted successfully!")
      fetchRatingAndVotingStats()
    } catch (error) {
      setError("Error submitting vote. Please try again.")
      console.error("Error submitting vote:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Rate and Vote</CardTitle>
        <CardDescription>Share your opinion about this dish</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Rating</h3>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button key={star} variant="ghost" size="sm" onClick={() => handleRating(star)} disabled={isLoading}>
                  <Star
                    className={`h-6 w-6 ${
                      (userRating ?? 0) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                </Button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {userRating ? `Your rating: ${userRating}` : "Rate this dish"}
              </span>
            </div>
          </div>

          {ratingStats && (
            <div>
              <h4 className="text-sm font-medium mb-1">Rating Distribution</h4>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center text-sm">
                  <span className="w-3">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mx-1" />
                  <Progress
                    value={(ratingStats.ratingCounts[rating] / ratingStats.totalRatings) * 100}
                    className="h-2 flex-grow mx-2"
                  />
                  <span className="text-muted-foreground">({ratingStats.ratingCounts[rating] || 0})</span>
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-1">
                Average: {ratingStats.averageRating.toFixed(1)} ({ratingStats.totalRatings} ratings)
              </p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Vote</h3>
            <div className="flex items-center space-x-4">
              <Button
                variant={userVote === "like" ? "default" : "outline"}
                size="sm"
                onClick={() => handleVote("like")}
                disabled={isLoading}
              >
                <ThumbsUp className="h-5 w-5 mr-1" />
                Like {votingStats?.likes ?? 0}
              </Button>
              <Button
                variant={userVote === "dislike" ? "default" : "outline"}
                size="sm"
                onClick={() => handleVote("dislike")}
                disabled={isLoading}
              >
                <ThumbsDown className="h-5 w-5 mr-1" />
                Dislike {votingStats?.dislikes ?? 0}
              </Button>
            </div>
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
        </div>
      </CardContent>
    </Card>
  )
}

export default RatingAndVotingForm

