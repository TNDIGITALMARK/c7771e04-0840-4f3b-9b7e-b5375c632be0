"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import NavigationBar from '@/components/NavigationBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { mockProducts, testimonials } from '@/lib/mockData';
import { Product } from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-[hsl(var(--toypaws-cream))] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))]/90 text-white"
          >
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      setCartItems(prev => [...prev, product]);
    }
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const productImages = [
    '/generated/fluffy-brown-bear-product.png',
    '/generated/roaring-lion-product.png',
    product.image
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--toypaws-cream))]">
      <NavigationBar
        cartItemCount={cartItems.length}
        onCartClick={() => console.log('Cart clicked')}
        onSearch={(query) => console.log('Search:', query)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/generated/fluffy-brown-bear-product.png';
                }}
              />
            </div>

            {/* Image thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-[hsl(var(--toypaws-coral))] shadow-lg'
                      : 'border-gray-200 hover:border-[hsl(var(--toypaws-sky))]'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/generated/fluffy-brown-bear-product.png';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <Badge className="bg-[hsl(var(--toypaws-yellow))] text-gray-800">
                    New Arrival
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-[hsl(var(--toypaws-sky))] text-white">
                    Featured
                  </Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-[hsl(var(--toypaws-coral))] text-white">
                    -{discountPercentage}% OFF
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-[hsl(var(--toypaws-yellow))] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{product.rating}</span>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-[hsl(var(--toypaws-coral))]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-lg font-semibold hover:bg-gray-100 rounded-l-lg"
                >
                  −
                </button>
                <span className="px-6 py-2 text-lg font-semibold border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-lg font-semibold hover:bg-gray-100 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))]/90 text-white py-4 text-lg font-semibold"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart • ${(product.price * quantity).toFixed(2)}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-[hsl(var(--toypaws-sky))] text-[hsl(var(--toypaws-sky))] hover:bg-[hsl(var(--toypaws-sky))] hover:text-white py-4 text-lg font-semibold"
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-[hsl(var(--toypaws-sky))]" />
                Free shipping over $50
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-[hsl(var(--toypaws-mint))]" />
                Safety tested
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="h-4 w-4 text-[hsl(var(--toypaws-yellow))]" />
                30-day returns
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
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
                    <div className="w-8 h-8 bg-[hsl(var(--toypaws-coral))] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}