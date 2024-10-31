'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import Image from 'next/image'

// Mock data for cart items and recommended products
const cartItems = [
  { id: 1, name: "Wireless Bluetooth Earbuds", price: 49.99, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Smart Fitness Tracker", price: 79.99, quantity: 2, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Portable Power Bank", price: 29.99, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
]

const recommendedProducts = [
  { id: 4, name: "Noise-Cancelling Headphones", price: 199.99, image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Smartphone Gimbal Stabilizer", price: 89.99, image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Wireless Charging Pad", price: 24.99, image: "/placeholder.svg?height=100&width=100" },
]

export function CartPageComponent() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10 // Fixed shipping cost
  const total = subtotal + shipping

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center p-4">
                <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md" />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Unit Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 mx-2 text-center" 
                    />
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="sm" className="mt-2" onClick={() => updateQuantity(item.id, 0)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <Image src={product.image} alt={product.name} width={50} height={50} className="rounded-md" />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                  <Button variant="outline" size="sm">Add</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}