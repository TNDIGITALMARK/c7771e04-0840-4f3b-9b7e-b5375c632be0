"use client";

import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from './ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onCheckout?: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  // Group items by ID and count quantities
  const cartItems: CartItem[] = items.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, [] as CartItem[]);

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-xl overflow-hidden">
        <Card className="h-full border-0 rounded-none flex flex-col">
          <CardHeader className="bg-[hsl(var(--toypaws-mint))] text-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Shopping Cart
                {totalItems > 0 && (
                  <Badge className="bg-[hsl(var(--toypaws-coral))] text-white">
                    {totalItems}
                  </Badge>
                )}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-800 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add some cuddly friends to get started!
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))]/90 text-white"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-[hsl(var(--toypaws-cream))] rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🧸</span>
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                          <p className="font-bold text-[hsl(var(--toypaws-coral))]">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem?.(item.id)}
                            className="text-gray-500 hover:text-red-500 mb-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gray-200 p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-[hsl(var(--toypaws-mint))]">
                        {totalPrice > 50 ? 'FREE' : '$4.99'}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-[hsl(var(--toypaws-coral))]">
                          ${(totalPrice + (totalPrice > 50 ? 0 : 4.99)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {totalPrice < 50 && (
                    <div className="bg-[hsl(var(--toypaws-yellow))]/20 border border-[hsl(var(--toypaws-yellow))] rounded-lg p-3 text-center text-sm">
                      <p className="font-semibold">Add ${(50 - totalPrice).toFixed(2)} more for FREE shipping! 🚚</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button
                      onClick={onCheckout}
                      className="w-full bg-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))]/90 text-white py-3 font-semibold"
                    >
                      Checkout • ${(totalPrice + (totalPrice > 50 ? 0 : 4.99)).toFixed(2)}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="w-full border-[hsl(var(--toypaws-sky))] text-[hsl(var(--toypaws-sky))] hover:bg-[hsl(var(--toypaws-sky))] hover:text-white"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShoppingCart;