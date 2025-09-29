"use client";

import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onProductClick,
  className
}) => {
  const discountPercentage = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Card className={cn(
      "group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white rounded-2xl",
      className
    )}>
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div
          className="aspect-square bg-gradient-to-br from-[hsl(var(--toypaws-cream))] to-[hsl(var(--toypaws-soft-purple))]/20 flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300"
          onClick={() => onProductClick?.(product)}
        >
          {/* Product image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-[hsl(var(--toypaws-yellow))] text-gray-800 hover:bg-[hsl(var(--toypaws-yellow))]/90">
              New
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-[hsl(var(--toypaws-coral))] text-white hover:bg-[hsl(var(--toypaws-coral))]/90">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-[hsl(var(--toypaws-coral))] transition-colors duration-200"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Quick Add to Cart (appears on hover) */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="w-full bg-[hsl(var(--toypaws-sky))] hover:bg-[hsl(var(--toypaws-sky))]/90 text-white rounded-xl"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4" onClick={() => onProductClick?.(product)}>
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-[hsl(var(--toypaws-coral))] transition-colors duration-200">
          {product.name}
        </h3>

        {/* Category */}
        <p className="text-sm text-gray-500 mb-2 capitalize">
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "text-[hsl(var(--toypaws-yellow))] fill-current"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[hsl(var(--toypaws-coral))]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          className="w-full bg-[hsl(var(--toypaws-mint))] hover:bg-[hsl(var(--toypaws-mint))]/90 text-gray-800 rounded-xl font-semibold"
        >
          Add to Cart • ${product.price.toFixed(2)}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;