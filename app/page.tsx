'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UtensilsCrossed, Phone, MapPin, Clock, ShoppingCart, Check } from 'lucide-react'
import { Fab } from '@/components/ui/fab'

// Menu data
const menuData = {
  'Nsima Meals': [
    { name: 'Nsima with goat meat + vegetables', price: 'MK 3,200', image: '/images/nsima-beef.jpg' },
    { name: 'Nsima with cow meat + vegetables', price: 'MK 3,200', image: '/images/SCM.jpg' },
    { name: 'Nsima with chicken + vegetables', price: 'MK 3,200', image: '/images/SC.jpg' },
    { name: 'Nsima with fish + vegetables', price: 'MK 2,000', image: '/images/SF.jpg' },
    { name: 'Nsima with beans + vegetables', price: 'MK 2,000', image: '/images/SB.jpg' },
    { name: 'Nsima with usipa + vegetables', price: 'MK 2,000', image: '/images/usipa.jpg' },
  ],
  'Rice Meals': [
    { name: 'Rice with cow or goat meat', price: 'MK 3,500', image: '/images/RB.jpg' },
    { name: 'Rice with beans', price: 'MK 2,500', image: '/images/rice-beans.jpg' },
    { name: 'Rice with fried chicken', price: 'MK 3,700', image: '/images/fried-rice.jpg' },
    { name: 'Rice with boiled chicken', price: 'MK 3,700', image: '/images/RC.jpg' },
  ],
  'Fast Foods': [
    { name: 'Chips with chicken', price: 'MK 2,800', image: '/images/CPC.jpg' },
    { name: 'Chips with braai chicken', price: 'MK 3,000', image: '/images/CBC.jpg' },
    { name: 'Chips plain', price: 'MK 2,500', image: '/images/plain.jpg' },
    { name: 'Chips with eggs', price: 'MK 2,200', image: '/images/CG.jpg' },
  ],
  'Drinks': [
    { name: 'Cold drinks', price: 'MK 800', image: '/images/soft-drinks.jpg' },
  ],
}

export default function LusperNandoFoodHub() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    notes: '',
  })

  const addToCart = (itemName: string) => {
    setCart(prev => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }))
  }

  const removeFromCart = (itemName: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[itemName] > 1) {
        newCart[itemName]--
      } else {
        delete newCart[itemName]
      }
      return newCart
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Build order message
    let orderMessage = `New Order from ${formData.name}%0A%0A`
    orderMessage += `Phone: ${formData.phone}%0A`
    orderMessage += `Location: ${formData.location}%0A%0A`
    orderMessage += `Order Details:%0A`
    
    Object.entries(cart).forEach(([item, quantity]) => {
      orderMessage += `- ${item} x${quantity}%0A`
    })
    
    if (formData.notes) {
      orderMessage += `%0ANotes: ${formData.notes}`
    }

    
    const whatsappNumber = '265999916443' 
    window.open(`https://wa.me/${whatsappNumber}?text=${orderMessage}`, '_blank')
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">LusperNando Food-Hub</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('menu')} className="text-foreground hover:text-primary transition-colors">
                Menu
              </button>
              <button onClick={() => scrollToSection('order')} className="text-foreground hover:text-primary transition-colors">
                Order
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
                Contact
              </button>
            </div>
            <button 
              onClick={() => scrollToSection('order')} 
              className="relative"
            >
              <ShoppingCart className="h-6 w-6 text-primary" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/bg.jpg" 
            alt="LusperNando Food-Hub Restaurant" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg">
              LusperNando Food-Hub
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty drop-shadow-md">
              Eat to your satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('order')}
                className="text-lg px-8"
              >
                Order Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('menu')}
                className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/50"
              >
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Menu</h2>
            <p className="text-lg text-muted-foreground">Fresh, delicious meals prepared with care</p>
          </div>

          <div className="grid gap-12">
            {Object.entries(menuData).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                  {category}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={item.image || "/placeholder.svg"} 
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg leading-relaxed">{item.name}</CardTitle>
                        <CardDescription className="text-xl font-bold text-primary">{item.price}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button 
                          onClick={() => addToCart(item.name)}
                          className="w-full"
                          variant={cart[item.name] ? "secondary" : "default"}
                        >
                          {cart[item.name] ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Added ({cart[item.name]})
                            </>
                          ) : (
                            'Add to Order'
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How to Order</h2>
            <p className="text-lg text-muted-foreground">Simple steps to get your meal</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Choose your food', desc: 'Browse our menu and select your favorite meals' },
              { step: '2', title: 'Fill the order form', desc: 'Enter your details and delivery location' },
              { step: '3', title: 'Submit order', desc: 'Send your order via WhatsApp' },
              { step: '4', title: 'We contact you', desc: 'We confirm your order and delivery time' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Place Your Order</h2>
              <p className="text-lg text-muted-foreground">Fill in your details and we'll contact you</p>
            </div>

            {/* Cart Summary */}
            {Object.keys(cart).length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(cart).map(([item, quantity]) => (
                      <div key={item} className="flex justify-between items-center">
                        <span className="text-foreground">{item}</span>
                        <div className="flex items-center gap-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeFromCart(item)}
                          >
                            -
                          </Button>
                          <span className="font-bold text-foreground w-8 text-center">{quantity}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card  className="border-t-2 border-b-2 border-red-500/60">
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent >
                <form onSubmit={handleSubmit} className="space-y-6 ">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input 
                      id="name" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="border-t-2 border-b-2 border-red-500/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g., 0888 123 456"
                      className="border-t-2 border-b-2 border-red-500/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location / Pickup Point *</Label>
                    <Input 
                      id="location" 
                      required 
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter your location or pickup point"
                       className="border-t-2 border-b-2 border-red-500/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea 
                      id="notes" 
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any special instructions or preferences"
                      rows={4}
                       className="border-t-2 border-b-2 border-red-500/60"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={Object.keys(cart).length === 0}
                  >
                    Submit Order via WhatsApp
                  </Button>

                  {Object.keys(cart).length === 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                      Please add items to your order from the menu above
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact/Footer Section */}
      <footer id="contact" className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="h-6 w-6" />
                <span className="text-xl font-bold">LusperNando Food-Hub</span>
              </div>
              <p className="text-background/80 leading-relaxed">
                Eat to your satisfaction.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-background/80">+265 999 916 443</p>
                    <p className="text-background/80">WhatsApp available</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Location</h3>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-background/80">
                  Chikanda, Zomba<br />
                  Malawi
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Opening Hours</h3>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-background/80">
                  <p>Monday - Saturday</p>
                  <p className="font-bold">8:00 AM - 8:00 PM</p>
                  <p className="mt-2">Sunday</p>
                  <p className="font-bold">10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center text-background/80">
            <p>© 2026 LusperNando Food-Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
 
      <Fab 
        label={cartItemCount > 0 ? `Order (${cartItemCount})` : 'Order'}
        icon={<ShoppingCart />}
        onClick={() => {
        
          const orderForm = document.getElementById('order-form');
          if (orderForm) {
            orderForm.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }}
      />
    </div>
  )
}
