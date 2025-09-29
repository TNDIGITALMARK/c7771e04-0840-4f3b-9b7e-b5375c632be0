"use client";

import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import HeroSection from '@/components/HeroSection';
import ProductCard, { Product } from '@/components/ProductCard';
import ShoppingCart from '@/components/ShoppingCart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockProducts, categories, testimonials } from '@/lib/mockData';
import { Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    // Here you could show a toast notification
    console.log(`Added ${product.name} to cart`);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }

    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;

    const currentQuantity = cartItems.filter(item => item.id === productId).length;
    const difference = quantity - currentQuantity;

    if (difference > 0) {
      // Add items
      const itemsToAdd = Array(difference).fill(product);
      setCartItems(prev => [...prev, ...itemsToAdd]);
    } else if (difference < 0) {
      // Remove items
      const itemsToRemove = Math.abs(difference);
      setCartItems(prev => {
        const newItems = [...prev];
        let removed = 0;
        return newItems.filter(item => {
          if (item.id === productId && removed < itemsToRemove) {
            removed++;
            return false;
          }
          return true;
        });
      });
    }
  };

  const handleCheckout = () => {
    alert(`Checkout functionality would be implemented here! Total items: ${cartItems.length}`);
  };

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product.name);
    window.location.href = `/product/${product.id}`;
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality
  };

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(product =>
        product.category === selectedCategory ||
        (selectedCategory === 'new-arrivals' && product.isNew) ||
        (selectedCategory === 'featured' && product.isFeatured)
      );

  return (
    <div className="min-h-screen bg-[hsl(var(--toypaws-cream))]">
      {/* Navigation */}
      <NavigationBar
        cartItemCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={handleSearch}
      />

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Flash Sale Banner */}
      <section className="bg-[hsl(var(--toypaws-yellow))] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            🎉 FLASH SALE: Up to 30% OFF All Plushies!
            <span className="text-[hsl(var(--toypaws-coral))] ml-2">Limited Time!</span>
          </h2>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all'
                ? 'bg-[hsl(var(--toypaws-coral))] text-white'
                : 'border-[hsl(var(--toypaws-coral))] text-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))] hover:text-white'}
            >
              All Products
            </Button>
            <Button
              variant={selectedCategory === 'featured' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('featured')}
              className={selectedCategory === 'featured'
                ? 'bg-[hsl(var(--toypaws-coral))] text-white'
                : 'border-[hsl(var(--toypaws-coral))] text-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))] hover:text-white'}
            >
              Featured
            </Button>
            <Button
              variant={selectedCategory === 'new-arrivals' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('new-arrivals')}
              className={selectedCategory === 'new-arrivals'
                ? 'bg-[hsl(var(--toypaws-coral))] text-white'
                : 'border-[hsl(var(--toypaws-coral))] text-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))] hover:text-white'}
            >
              New Arrivals
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id
                  ? 'bg-[hsl(var(--toypaws-coral))] text-white'
                  : 'border-[hsl(var(--toypaws-coral))] text-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))] hover:text-white'}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Cuddly Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover magical companions that spark imagination and create lasting memories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Loved by families everywhere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-[hsl(var(--toypaws-cream))] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-[hsl(var(--toypaws-yellow))] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-[hsl(var(--toypaws-coral))]/20">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--toypaws-mint))] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[hsl(var(--toypaws-coral))] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TP</span>
                </div>
                <span className="text-2xl font-bold text-gray-800 font-['Nunito']">
                  ToyPaws
                </span>
              </div>
              <p className="text-gray-700">
                Creating magical moments with cuddly companions for children everywhere.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#bears" className="hover:text-[hsl(var(--toypaws-coral))]">Bears</a></li>
                <li><a href="#farm-animals" className="hover:text-[hsl(var(--toypaws-coral))]">Farm Animals</a></li>
                <li><a href="#wild-animals" className="hover:text-[hsl(var(--toypaws-coral))]">Wild Animals</a></li>
                <li><a href="#new-arrivals" className="hover:text-[hsl(var(--toypaws-coral))]">New Arrivals</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#contact" className="hover:text-[hsl(var(--toypaws-coral))]">Contact Us</a></li>
                <li><a href="#shipping" className="hover:text-[hsl(var(--toypaws-coral))]">Shipping Info</a></li>
                <li><a href="#returns" className="hover:text-[hsl(var(--toypaws-coral))]">Returns</a></li>
                <li><a href="#faq" className="hover:text-[hsl(var(--toypaws-coral))]">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#newsletter" className="hover:text-[hsl(var(--toypaws-coral))]">Newsletter</a></li>
                <li><a href="#social" className="hover:text-[hsl(var(--toypaws-coral))]">Social Media</a></li>
                <li><a href="#about" className="hover:text-[hsl(var(--toypaws-coral))]">About Us</a></li>
                <li><a href="#blog" className="hover:text-[hsl(var(--toypaws-coral))]">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 ToyPaws. All rights reserved. Made with ❤️ for children everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}