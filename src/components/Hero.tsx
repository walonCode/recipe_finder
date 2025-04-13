import { Badge } from "./ui/badge";

export default function Hero() {


  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge className="mb-4 px-3 py-1 text-sm bg-primary/20 text-primary border-primary/20">
            Discover Delicious Recipes
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Find the Perfect Recipe <br className="hidden sm:block" />
            for Any Occasion
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
            Explore thousands of recipes from around the world. Search by ingredients, cuisine, or dietary preferences.
          </p>
        </div>
      </div>
    </div>
  )
}

