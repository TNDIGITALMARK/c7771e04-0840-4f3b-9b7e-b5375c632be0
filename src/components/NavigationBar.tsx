"use client";

import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface NavigationBarProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  cartItemCount = 0,
  onCartClick,
  onSearch
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Bears',
    'Farm Animals',
    'Cats',
    'New Arrivals'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <nav className="bg-[hsl(var(--toypaws-mint))] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[hsl(var(--toypaws-coral))] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TP</span>
              </div>
              <span className="text-2xl font-bold text-gray-800 font-['Nunito']">
                ToyPaws
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#${category.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-700 hover:text-[hsl(var(--toypaws-coral))] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search toys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[hsl(var(--toypaws-sky))] focus:border-transparent bg-white"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-[hsl(var(--toypaws-coral))]">
              <User className="h-5 w-5" />
            </Button>

            {/* Shopping Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-[hsl(var(--toypaws-coral))]"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[hsl(var(--toypaws-coral))] text-white border-0"
                >
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[hsl(var(--toypaws-coral))]"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[hsl(var(--toypaws-mint))] border-t border-gray-200">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search toys..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[hsl(var(--toypaws-sky))] focus:border-transparent bg-white"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(' ', '-')}`}
                className="text-gray-700 hover:text-[hsl(var(--toypaws-coral))] block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;