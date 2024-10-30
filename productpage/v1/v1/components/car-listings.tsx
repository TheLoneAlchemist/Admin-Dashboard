'use client'

import * as React from 'react'
import Image from 'next/image'
import { Search, Heart, User, ChevronDown, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Filter, X } from 'lucide-react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface Product {
  id: number
  name: string
  year: number
  mileage: number
  price: number
  image: string
  category: string
}

const categories = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van']

const generateDummyProducts = (count: number, startId: number = 0): Product[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: startId + index + 1,
    name: `Car Model ${startId + index + 1}`,
    year: 2015 + Math.floor(Math.random() * 9),
    mileage: Math.floor(Math.random() * 50000) + 10000,
    price: Math.floor(Math.random() * 3000000) + 500000,
    image: `/placeholder.svg?height=300&width=400&text=Car+${startId + index + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)]
  }))
}

export function CarListings() {
  const [allProducts, setAllProducts] = React.useState<Product[]>(generateDummyProducts(100))
  const [displayedProducts, setDisplayedProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const [priceRange, setPriceRange] = React.useState([500000, 3500000])
  const [yearRange, setYearRange] = React.useState([2015, 2023])
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])

  const applyFilters = React.useCallback(() => {
    const filtered = allProducts.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      product.year >= yearRange[0] && product.year <= yearRange[1] &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category))
    )
    setDisplayedProducts(filtered.slice(0, 12))
    setHasMore(filtered.length > 12)
  }, [allProducts, priceRange, yearRange, selectedCategories])

  React.useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const loadMoreProducts = () => {
    if (loading || !hasMore) return
    setLoading(true)
    setTimeout(() => {
      const currentLength = displayedProducts.length
      const filtered = allProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1] &&
        product.year >= yearRange[0] && product.year <= yearRange[1] &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category))
      )
      const newProducts = filtered.slice(currentLength, currentLength + 8)
      setDisplayedProducts(prevProducts => [...prevProducts, ...newProducts])
      setLoading(false)
      setHasMore(currentLength + 8 < filtered.length)
    }, 1000) // Simulate network delay
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return
      loadMoreProducts()
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-3xl font-bold text-indigo-600">AutoMart</div>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Buy Car</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500 to-indigo-600 p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium text-white">
                                Find Your Dream Car
                              </div>
                              <p className="text-sm leading-tight text-indigo-100">
                                Browse through our extensive collection of quality used cars.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a href="/" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600">
                              <div className="text-sm font-medium leading-none">Popular Brands</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Explore cars from top manufacturers
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a href="/" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600">
                              <div className="text-sm font-medium leading-none">Car Types</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Find the perfect car for your needs
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Sell Car</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {[
                          {
                            title: "List Your Car",
                            href: "/",
                            description: "Get the best price for your vehicle",
                          },
                          {
                            title: "Car Valuation",
                            href: "/",
                            description: "Find out how much your car is worth",
                          },
                          {
                            title: "Selling Guide",
                            href: "/",
                            description: "Tips and tricks for selling your car",
                          },
                          {
                            title: "FAQ",
                            href: "/",
                            description: "Answers to common questions about selling",
                          },
                        ].map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
                              >
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>More</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {[
                          {
                            title: "About Us",
                            href: "/",
                            description: "Learn more about AutoMart",
                          },
                          {
                            title: "Contact",
                            href: "/",
                            description: "Get in touch with our team",
                          },
                          {
                            title: "Blog",
                            href: "/",
                            description: "Read our latest news and articles",
                          },
                          {
                            title: "Careers",
                            href: "/",
                            description: "Join our growing team",
                          },
                        ].map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
                              >
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5 text-indigo-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-indigo-600" />
              </Button>
              <Select defaultValue="cityA">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cityA">City A</SelectItem>
                  <SelectItem value="cityB">City B</SelectItem>
                  <SelectItem value="cityC">City C</SelectItem>
                  <SelectItem value="cityD">City D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Find Your Perfect Car</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Input
                className="w-full sm:w-[300px] pl-10"
                placeholder="Search cars..."
                type="search"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Cars</SheetTitle>
                  <SheetDescription>
                    Adjust the filters to find your perfect car.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Price Range</h4>
                    <Slider
                      min={500000}
                      max={3500000}
                      step={100000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Year Range</h4>
                    <Slider
                      min={2015}
                      max={2023}
                      step={1}
                      value={yearRange}
                      onValueChange={setYearRange}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Categories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              setSelectedCategories(prev =>
                                checked
                                  ? [...prev, category]
                                  : prev.filter(c => c !== category)
                              )
                            }}
                          />
                          <Label htmlFor={category}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
              </SheetContent>
            </Sheet>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="group relative rounded-xl bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4 text-indigo-600" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.year} • {product.mileage.toLocaleString()} km • {product.category}</p>
                <p className="mt-2 text-xl font-bold text-indigo-600">₹{product.price.toLocaleString()}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">AutoMart</h3>
              <p className="text-gray-400">Find your perfect car with ease. AutoMart offers a wide range of quality used cars to suit your needs and budget.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-indigo-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</a></li>
                <li><a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Buy Car</a></li>
                <li><a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Sell Car</a></li>
                <li><a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">About Us</a></li>
                <li><a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-indigo-400">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-indigo-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-indigo-400" />
                  <span>info@automart.com</span>
                </li>
                <li>123 Car Street, Auto City, AC 12345</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-indigo-400">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 AutoMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}