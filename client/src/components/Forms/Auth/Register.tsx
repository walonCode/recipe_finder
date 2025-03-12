import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, XCircle,Map } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Alert, AlertDescription } from "../../ui/alert"
import { Progress } from "../../ui/progress"
import { Separator } from "../../ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import { Textarea } from "../../ui/textarea"
import { axiosInstance } from "../../../api/axiosInstance"
import useAuthRedirect from "../../../hooks/useAuthRedirect"


export default function Register() {
  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [address, setAddress] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useAuthRedirect()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      setIsLoading(true)
      if(password === confirmPassword){
        const response = await axiosInstance.post("/users/register", {
          username,
          fullname,
          email,
          password,
          bio,
          address
        })
        if(response.status === 201){
          navigate("/login")
          console.log(response.data)
        }
      }
    }catch(error){
      console.error(error)
      setError("An error occurred during registration. Please try again.")
    }finally{
      setIsLoading(false)
    }
  }

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25
    if (password.match(/\d/)) strength += 25
    if (password.match(/[^a-zA-Z\d]/)) strength += 25
    return strength
  }

  const passwordStrength = calculatePasswordStrength(password)

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 50) return "text-red-500"
    if (strength < 75) return "text-yellow-500"
    return "text-green-500"
  }

  const renderPasswordCriteria = () => {
    const criteria = [
      { label: "At least 8 characters", met: password.length >= 8 },
      { label: "Contains uppercase & lowercase letters", met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
      { label: "Contains a number", met: /\d/.test(password) },
      { label: "Contains a special character", met: /[^a-zA-Z\d]/.test(password) },
    ]

    return (
      <ul className="text-sm space-y-1 mt-2">
        {criteria.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.met ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
            )}
            <span className={item.met ? "text-green-700" : "text-red-700"}>{item.label}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="fullname"
                placeholder="John Doe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="username"
                placeholder="@johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <div className="relative flex items-center justify-center">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Textarea
                id="bio"
                placeholder="Tell us a bit about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="pl-10 "
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="address"
                placeholder="123 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <Progress value={passwordStrength} className="h-2" />
            <p className={`text-xs ${getPasswordStrengthColor(passwordStrength)}`}>
              Password strength: {passwordStrength === 100 ? "Strong" : passwordStrength >= 50 ? "Medium" : "Weak"}
            </p>
            {renderPasswordCriteria()}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button type="submit" className="w-full" disabled={isLoading || passwordStrength < 75}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </TooltipTrigger>
              {passwordStrength < 75 && (
                <TooltipContent>
                  <p>Please ensure your password meets the strength criteria</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </form>

        <Separator />

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

