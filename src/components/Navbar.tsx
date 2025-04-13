"use client"

import { useState } from "react"
import Link from "next/link"
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
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export default function Navbar() {
  let isLoggedIn;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Toggle login state (for demo purposes)

  if(Cookies.get("accessToken")){
    isLoggedIn = true
  }

  const token = Cookies.get("userToken");
  let user
  if (token) {
    try {
      user = jwtDecode(token) as { username: string };
    } catch (error) {
      console.error("Invalid token:", error);
    }
  } else {
    console.warn("No token found in cookies.");
  }


  const handleLogout = () => {
    // Perform logout logic here
    Cookies.remove("accessToken")
    Cookies.remove("userToken")
    window.location.href = "/login"
  }
  
  return (
    <header className="sticky mx-auto top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 mx-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl hidden sm:inline-block">Recipe Finder</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link href="/food/create" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
            <Plus className="h-4 w-4" />
            Add Recipe
          </Link>
          <Link href="/food" className="text-sm font-medium flex items-center gap-1 hover:text-primary">
            <BookOpen className="h-4 w-4" />
            View Recipe
          </Link>
        </nav>

        {/* Auth Buttons or User Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Button variant="outline" size="sm">
                <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4 mr-2" />
                Login</Link>
              </Button>
              <Button size="sm"><Link href='/signup'>sign up</Link></Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>{user?.username.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link className="flex items-center gap-1" href='/profile'>
                      <UserCircle className="h-4 w-4 mr-2" /> Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
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
              href="/"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/food/create"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Plus className="h-5 w-5" />
              Add Recipe
            </Link>
            <Link
              href="/food"
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
                  <Link href='/login' className="flex items-center gap-2">
                    <LogIn className="h-5 w-5 mr-2" />
                    login</Link>
                  </Button>
                  <Button className="w-full justify-start"><Link href='/signup'>
                  sign up</Link></Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>{user?.username.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium"><Link href='/profile'>My Account</Link></span>
                  </div>
                  <Button variant="destructive" className="w-full justify-start mt-2" onClick={handleLogout} >
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

