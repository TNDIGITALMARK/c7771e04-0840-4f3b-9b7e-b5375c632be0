"use client";

import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-[hsl(var(--toypaws-cream))] to-[hsl(var(--toypaws-soft-purple))] py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="toypaws-hero-text text-4xl md:text-6xl lg:text-7xl text-gray-800 mb-6 leading-tight">
              Snuggle Up to
              <span className="block text-[hsl(var(--toypaws-coral))]">
                Adventure!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Discover our magical collection of cuddly companions that spark imagination and create lasting memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[hsl(var(--toypaws-coral))] hover:bg-[hsl(var(--toypaws-coral))/90] text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[hsl(var(--toypaws-sky))] text-[hsl(var(--toypaws-sky))] hover:bg-[hsl(var(--toypaws-sky))] hover:text-white px-8 py-3 text-lg rounded-full transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right side - Hero image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Hero image */}
              <img
                src="/generated/toypaws-hero-child-teddy.png"
                alt="Happy child with teddy bear - ToyPaws magical moments"
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-8 h-8 bg-white/30 rounded-full animate-bounce"></div>
              <div className="absolute top-1/3 left-4 w-12 h-12 bg-white/15 rounded-full"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[hsl(var(--toypaws-yellow))] rounded-full shadow-lg animate-float"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[hsl(var(--toypaws-coral))] rounded-full shadow-lg animate-float-delayed"></div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-[hsl(var(--toypaws-coral))]/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-[hsl(var(--toypaws-sky))]/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-[hsl(var(--toypaws-yellow))]/30 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-[hsl(var(--toypaws-mint))]/25 rounded-full"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;