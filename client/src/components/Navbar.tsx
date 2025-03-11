import { useState } from "react"
import { Link } from "react-router-dom"
import { Home, Plus, BookOpen,  LogIn, UserCircle, LogOut, Menu, X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Toggle login state (for demo purposes)
  
  return (
    <header className="sticky mx-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 mx-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl hidden sm:inline-block">Recipe Finder</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link to="/add_food" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
            <Plus className="h-4 w-4" />
            Add Recipe
          </Link>
          <Link to="/food" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
            <BookOpen className="h-4 w-4" />
            View Recipe
          </Link>
        </nav>

        {/* Auth Buttons or User Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Button variant="outline" size="sm">
                <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4 mr-2" />
                Login</Link>
              </Button>
              <Button size="sm"><Link to='/register'>sign up</Link></Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link className="flex items-center gap-1" to='/profile'>
                      <UserCircle className="h-4 w-4 mr-2" /> Profile</Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>My Recipes</DropdownMenuItem>
                  <DropdownMenuItem>Saved Recipes</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="/add_food"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Plus className="h-5 w-5" />
              Add Recipe
            </Link>
            <Link
              to="/food"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              View Recipe
            </Link>
           

            <div className="pt-2 border-t">
              {!isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-start">
                  <Link to='/login' className="flex items-center gap-2">
                    <LogIn className="h-5 w-5 mr-2" />
                    login</Link>
                  </Button>
                  <Button className="w-full justify-start"><Link to='/register'>
                  sign up</Link></Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">My Account</span>
                  </div>
                  <Button variant="destructive" className="w-full justify-start mt-2" >
                    <LogOut className="h-5 w-5 mr-2" />
                    Log Out
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

