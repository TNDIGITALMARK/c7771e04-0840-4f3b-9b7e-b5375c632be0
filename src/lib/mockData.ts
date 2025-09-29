import { Product } from '@/components/ProductCard';

export const mockProducts: Product[] = [
  // Bears
  {
    id: '1',
    name: 'Fluffy Brown Bear',
    price: 24.99,
    originalPrice: 29.99,
    image: '/images/fluffy-brown-bear.jpg',
    rating: 4.8,
    reviewCount: 127,
    category: 'bears',
    isFeatured: true,
    description: 'Super soft and cuddly brown teddy bear, perfect for snuggling and adventures. Made with premium plush materials and safety tested for all ages.'
  },
  {
    id: '2',
    name: 'Tiny Sunshine Bear',
    price: 24.99,
    image: '/images/tiny-sunshine-bear.jpg',
    rating: 4.6,
    reviewCount: 89,
    category: 'bears',
    isNew: true,
    description: 'Adorable yellow bear that brings sunshine to every day. Perfect size for little hands and big hugs.'
  },
  {
    id: '3',
    name: 'My Sleepy Bear',
    price: 24.99,
    image: '/images/my-sleepy-bear.jpg',
    rating: 4.9,
    reviewCount: 156,
    category: 'bears',
    description: 'The perfect bedtime companion with ultra-soft fur and a calming lavender scent.'
  },

  // Farm Animals
  {
    id: '4',
    name: 'Moo-nificent Cow',
    price: 24.99,
    image: '/images/moo-cow.jpg',
    rating: 4.7,
    reviewCount: 94,
    category: 'farm animals',
    description: 'Friendly farm cow with realistic black and white spots. Great for teaching about farm life!'
  },
  {
    id: '5',
    name: 'Baa-utiful Sheep',
    price: 22.99,
    originalPrice: 26.99,
    image: '/images/sheep.jpg',
    rating: 4.5,
    reviewCount: 73,
    category: 'farm animals',
    description: 'Fluffy white sheep with the softest wool texture. Perfect for counting sheep at bedtime!'
  },
  {
    id: '6',
    name: 'Happy Pig',
    price: 21.99,
    image: '/images/happy-pig.jpg',
    rating: 4.8,
    reviewCount: 112,
    category: 'farm animals',
    isNew: true,
    description: 'Adorable pink pig with a cheerful smile. Made from hypoallergenic materials.'
  },

  // Wild Animals
  {
    id: '7',
    name: 'Roaring Lion',
    price: 29.99,
    originalPrice: 34.99,
    image: '/images/roaring-lion.jpg',
    rating: 4.9,
    reviewCount: 201,
    category: 'wild animals',
    isFeatured: true,
    description: 'Majestic lion with a magnificent mane. Encourages brave adventures and storytelling.'
  },
  {
    id: '8',
    name: 'Gentle Elephant',
    price: 32.99,
    image: '/images/gentle-elephant.jpg',
    rating: 4.7,
    reviewCount: 145,
    category: 'wild animals',
    description: 'Large, huggable elephant with floppy ears and a trunk that\'s perfect for snuggling.'
  },
  {
    id: '9',
    name: 'Playful Monkey',
    price: 19.99,
    image: '/images/playful-monkey.jpg',
    rating: 4.6,
    reviewCount: 88,
    category: 'wild animals',
    isNew: true,
    description: 'Energetic monkey with long arms perfect for hanging hugs. Great for active play!'
  },

  // Sea Animals
  {
    id: '10',
    name: 'Ocean Whale',
    price: 27.99,
    image: '/images/ocean-whale.jpg',
    rating: 4.8,
    reviewCount: 167,
    category: 'sea animals',
    description: 'Gentle giant of the sea with a smooth, soft texture. Perfect for bath time adventures.'
  },
  {
    id: '11',
    name: 'Friendly Dolphin',
    price: 24.99,
    originalPrice: 28.99,
    image: '/images/friendly-dolphin.jpg',
    rating: 4.7,
    reviewCount: 132,
    category: 'sea animals',
    description: 'Smart and playful dolphin that loves to jump and play. Great for imaginative ocean adventures.'
  },
  {
    id: '12',
    name: 'Cuddly Seal',
    price: 22.99,
    image: '/images/cuddly-seal.jpg',
    rating: 4.5,
    reviewCount: 76,
    category: 'sea animals',
    isNew: true,
    description: 'Adorable seal pup with whiskers and flippers. Super soft and perfect for snuggling.'
  }
];

export const categories = [
  {
    id: 'bears',
    name: 'Bears',
    description: 'Classic teddy bears and cuddly bear friends',
    image: '/images/category-bears.jpg'
  },
  {
    id: 'farm-animals',
    name: 'Farm Animals',
    description: 'Friendly farm friends for learning and play',
    image: '/images/category-farm.jpg'
  },
  {
    id: 'wild-animals',
    name: 'Wild Animals',
    description: 'Adventure-ready wild animal companions',
    image: '/images/category-wild.jpg'
  },
  {
    id: 'sea-animals',
    name: 'Sea Animals',
    description: 'Ocean creatures for aquatic adventures',
    image: '/images/category-sea.jpg'
  }
];

export const featuredProducts = mockProducts.filter(product => product.isFeatured);
export const newArrivals = mockProducts.filter(product => product.isNew);

export const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    comment: 'My daughter absolutely loves her new teddy bear! The quality is amazing and it\'s so soft.',
    avatar: '/images/avatar-1.jpg',
    verified: true
  },
  {
    id: 2,
    name: 'Mike R.',
    rating: 5,
    comment: 'Fast shipping and great customer service. The lion toy is exactly as described!',
    avatar: '/images/avatar-2.jpg',
    verified: true
  },
  {
    id: 3,
    name: 'Emily K.',
    rating: 4,
    comment: 'Perfect gifts for my nephew\'s birthday. He hasn\'t put down the monkey since he got it!',
    avatar: '/images/avatar-3.jpg',
    verified: true
  }
];