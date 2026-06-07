export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  seller: string;
  sellerAvatar: string;
  description: string;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  badge?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  priceUnit: string;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  provider: string;
  providerAvatar: string;
  description: string;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  badge?: string;
  location: string;
  availability: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  followers: number;
  products: number;
  isFollowed?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  followers: number;
  services: number;
  location: string;
  isFollowed?: boolean;
}

export interface FeedItem {
  id: string;
  type: 'product' | 'service' | 'reel';
  image: string;
  title: string;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

export interface Order {
  id: string;
  product: string;
  image: string;
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  seller: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const productCategories: Category[] = [
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'native', name: 'Native Wear', icon: 'Sparkles' },
  { id: 'shoes', name: 'Shoes', icon: 'Footprints' },
  { id: 'bags', name: 'Bags', icon: 'ShoppingBag' },
  { id: 'jewelry', name: 'Jewelry', icon: 'Gem' },
  { id: 'phones', name: 'Phones', icon: 'Smartphone' },
  { id: 'electronics', name: 'Electronics', icon: 'Headphones' },
  { id: 'furniture', name: 'Furniture', icon: 'Sofa' },
  { id: 'beauty', name: 'Beauty', icon: 'Palette' },
  { id: 'food', name: 'Food', icon: 'UtensilsCrossed' },
];

export const serviceCategories: Category[] = [
  { id: 'tailoring', name: 'Tailoring', icon: 'Scissors' },
  { id: 'photography', name: 'Photography', icon: 'Camera' },
  { id: 'videography', name: 'Videography', icon: 'Video' },
  { id: 'design', name: 'Graphic Design', icon: 'PenTool' },
  { id: 'programming', name: 'Programming', icon: 'Code' },
  { id: 'marketing', name: 'Digital Marketing', icon: 'TrendingUp' },
  { id: 'makeup', name: 'Makeup', icon: 'Sparkles' },
  { id: 'plumbing', name: 'Plumbing', icon: 'Wrench' },
  { id: 'cleaning', name: 'Cleaning', icon: 'Droplets' },
  { id: 'tutoring', name: 'Tutoring', icon: 'BookOpen' },
  { id: 'interior', name: 'Interior Design', icon: 'Home' },
  { id: 'events', name: 'Event Planning', icon: 'Calendar' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Luxury Gold Chronograph Watch',
    price: 299.99,
    originalPrice: 450.00,
    image: '/products/watch.jpg',
    images: ['/products/watch.jpg'],
    category: 'jewelry',
    rating: 4.9,
    reviews: 128,
    seller: 'LuxTime Store',
    sellerAvatar: '/avatars/seller1.jpg',
    description: 'Premium chronograph watch with genuine leather strap and gold-plated case. Water-resistant up to 50m.',
    likes: 342,
    badge: 'Trending',
  },
  {
    id: 'p2',
    name: 'Designer Leather Crossbody Bag',
    price: 149.99,
    originalPrice: 220.00,
    image: '/products/bag.jpg',
    images: ['/products/bag.jpg'],
    category: 'bags',
    rating: 4.8,
    reviews: 96,
    seller: 'Bella Bags',
    sellerAvatar: '/avatars/seller2.jpg',
    description: 'Handcrafted genuine leather bag with gold-tone hardware. Perfect for everyday elegance.',
    likes: 256,
    badge: 'Best Seller',
  },
  {
    id: 'p3',
    name: 'Wireless Noise-Canceling Headphones',
    price: 189.99,
    image: '/products/headphones.jpg',
    images: ['/products/headphones.jpg'],
    category: 'electronics',
    rating: 4.7,
    reviews: 215,
    seller: 'TechHub',
    sellerAvatar: '/avatars/seller3.jpg',
    description: 'Studio-quality sound with active noise cancellation. 30-hour battery life.',
    likes: 189,
  },
  {
    id: 'p4',
    name: 'Classic Red Stiletto Heels',
    price: 89.99,
    originalPrice: 130.00,
    image: '/products/shoes.jpg',
    images: ['/products/shoes.jpg'],
    category: 'shoes',
    rating: 4.6,
    reviews: 78,
    seller: 'ShoeVogue',
    sellerAvatar: '/avatars/seller4.jpg',
    description: 'Glossy patent leather pumps with a 4-inch heel. Comfortable cushioned insole.',
    likes: 312,
  },
  {
    id: 'p5',
    name: 'Modern Minimalist Sofa',
    price: 899.99,
    originalPrice: 1200.00,
    image: '/products/sofa.jpg',
    images: ['/products/sofa.jpg'],
    category: 'furniture',
    rating: 4.9,
    reviews: 45,
    seller: 'HomeLux Furnishings',
    sellerAvatar: '/avatars/seller5.jpg',
    description: 'Scandinavian design 3-seater sofa with premium fabric upholstery. Free delivery.',
    likes: 167,
    badge: 'Featured',
  },
  {
    id: 'p6',
    name: 'Gourmet Cheeseburger',
    price: 18.99,
    image: '/products/burger.jpg',
    images: ['/products/burger.jpg'],
    category: 'food',
    rating: 4.8,
    reviews: 334,
    seller: 'Grill Masters',
    sellerAvatar: '/avatars/seller6.jpg',
    description: 'Double patty, melted cheddar, fresh lettuce and tomato on a brioche bun.',
    likes: 445,
    badge: 'Popular',
  },
  {
    id: 'p7',
    name: 'Flagship 5G Smartphone',
    price: 699.99,
    originalPrice: 899.99,
    image: '/products/phone.jpg',
    images: ['/products/phone.jpg'],
    category: 'phones',
    rating: 4.7,
    reviews: 512,
    seller: 'MobileZone',
    sellerAvatar: '/avatars/seller7.jpg',
    description: 'Latest flagship with 120Hz AMOLED display, triple camera system, and 5000mAh battery.',
    likes: 678,
  },
  {
    id: 'p8',
    name: 'Diamond Pendant Necklace',
    price: 499.99,
    image: '/products/jewelry.jpg',
    images: ['/products/jewelry.jpg'],
    category: 'jewelry',
    rating: 4.9,
    reviews: 89,
    seller: 'Royal Gems',
    sellerAvatar: '/avatars/seller8.jpg',
    description: '18K gold chain with certified diamond pendant. Comes in luxury gift box.',
    likes: 523,
    badge: 'Premium',
  },
  {
    id: 'p9',
    name: 'Açaí Superfood Bowl',
    price: 14.99,
    image: '/products/food.jpg',
    images: ['/products/food.jpg'],
    category: 'food',
    rating: 4.6,
    reviews: 201,
    seller: 'Healthy Bites',
    sellerAvatar: '/avatars/seller9.jpg',
    description: 'Fresh açaí topped with granola, seasonal berries, banana, and coconut flakes.',
    likes: 289,
  },
  {
    id: 'p10',
    name: 'African Print Maxi Dress',
    price: 79.99,
    image: '/products/native-wear.jpg',
    images: ['/products/native-wear.jpg'],
    category: 'native',
    rating: 4.8,
    reviews: 156,
    seller: 'AfroChic Fashion',
    sellerAvatar: '/avatars/seller10.jpg',
    description: 'Vibrant Ankara print dress with flattering A-line silhouette. Perfect for special occasions.',
    likes: 412,
    badge: 'New',
  },
];

export const services: Service[] = [
  {
    id: 's1',
    name: 'Professional Photography Session',
    price: 250,
    priceUnit: 'per session',
    image: '/services/photography.jpg',
    images: ['/services/photography.jpg'],
    category: 'photography',
    rating: 4.9,
    reviews: 87,
    provider: 'Lens & Light Studio',
    providerAvatar: '/avatars/provider1.jpg',
    description: '2-hour professional photoshoot with edited digital photos. Studio or on-location available.',
    likes: 234,
    location: 'Lagos, Nigeria',
    availability: 'Mon-Sat, 9AM-6PM',
  },
  {
    id: 's2',
    name: 'Bridal & Event Makeup',
    price: 150,
    priceUnit: 'per session',
    image: '/services/makeup.jpg',
    images: ['/services/makeup.jpg'],
    category: 'makeup',
    rating: 4.8,
    reviews: 134,
    provider: 'Glam by Ada',
    providerAvatar: '/avatars/provider2.jpg',
    description: 'Professional makeup artistry for weddings, events, and photoshoots. Premium products used.',
    likes: 356,
    location: 'Abuja, Nigeria',
    availability: 'By appointment',
    badge: 'Top Rated',
  },
  {
    id: 's3',
    name: 'Expert Plumbing Services',
    price: 75,
    priceUnit: 'per hour',
    image: '/services/plumbing.jpg',
    images: ['/services/plumbing.jpg'],
    category: 'plumbing',
    rating: 4.7,
    reviews: 203,
    provider: 'FixIt Plumbing',
    providerAvatar: '/avatars/provider3.jpg',
    description: 'Leak repairs, pipe installation, bathroom fittings. Licensed and insured professionals.',
    likes: 178,
    location: 'Lagos, Nigeria',
    availability: '24/7 Emergency',
  },
  {
    id: 's4',
    name: 'Brand Identity Design',
    price: 500,
    priceUnit: 'per project',
    image: '/services/design.jpg',
    images: ['/services/design.jpg'],
    category: 'design',
    rating: 4.9,
    reviews: 56,
    provider: 'Creative Studio NG',
    providerAvatar: '/avatars/provider4.jpg',
    description: 'Complete brand package: logo, business cards, letterhead, and brand guidelines.',
    likes: 145,
    location: 'Remote',
    availability: '2-3 weeks delivery',
  },
  {
    id: 's5',
    name: 'Luxury Event Planning',
    price: 2000,
    priceUnit: 'per event',
    image: '/services/events.jpg',
    images: ['/services/events.jpg'],
    category: 'events',
    rating: 5.0,
    reviews: 42,
    provider: 'Prestige Events',
    providerAvatar: '/avatars/provider5.jpg',
    description: 'Full-service event planning for weddings, corporate events, and celebrations.',
    likes: 267,
    location: 'Nationwide',
    availability: 'Book 4 weeks ahead',
  },
  {
    id: 's6',
    name: 'Interior Design Consultation',
    price: 300,
    priceUnit: 'per room',
    image: '/services/interior.jpg',
    images: ['/services/interior.jpg'],
    category: 'interior',
    rating: 4.8,
    reviews: 91,
    provider: 'SpaceCraft Interiors',
    providerAvatar: '/avatars/provider6.jpg',
    description: 'Personalized interior design with 3D visualization. Furniture sourcing included.',
    likes: 198,
    location: 'Lagos & Abuja',
    availability: 'Mon-Fri, 10AM-5PM',
  },
  {
    id: 's7',
    name: 'Deep Cleaning Service',
    price: 120,
    priceUnit: 'per session',
    image: '/services/cleaning.jpg',
    images: ['/services/cleaning.jpg'],
    category: 'cleaning',
    rating: 4.6,
    reviews: 178,
    provider: 'Sparkle Clean Co.',
    providerAvatar: '/avatars/provider7.jpg',
    description: 'Thorough deep cleaning for homes and offices. Eco-friendly products. Satisfaction guaranteed.',
    likes: 156,
    location: 'Lagos, Nigeria',
    availability: 'Daily, 8AM-8PM',
  },
  {
    id: 's8',
    name: 'Digital Marketing Strategy',
    price: 800,
    priceUnit: 'per month',
    image: '/services/marketing.jpg',
    images: ['/services/marketing.jpg'],
    category: 'marketing',
    rating: 4.7,
    reviews: 73,
    provider: 'GrowthHackers NG',
    providerAvatar: '/avatars/provider8.jpg',
    description: 'Social media management, SEO, content marketing, and paid ads. Monthly reports included.',
    likes: 189,
    location: 'Remote',
    availability: 'Ongoing',
  },
];

export const sellers: Seller[] = [
  { id: 'se1', name: 'LuxTime Store', avatar: '/avatars/seller1.jpg', rating: 4.9, followers: 12500, products: 48 },
  { id: 'se2', name: 'Bella Bags', avatar: '/avatars/seller2.jpg', rating: 4.8, followers: 8900, products: 32 },
  { id: 'se3', name: 'TechHub', avatar: '/avatars/seller3.jpg', rating: 4.7, followers: 22100, products: 156 },
  { id: 'se4', name: 'AfroChic Fashion', avatar: '/avatars/seller10.jpg', rating: 4.8, followers: 15600, products: 89 },
];

export const providers: Provider[] = [
  { id: 'pr1', name: 'Lens & Light Studio', avatar: '/avatars/provider1.jpg', rating: 4.9, followers: 6700, services: 12, location: 'Lagos' },
  { id: 'pr2', name: 'Glam by Ada', avatar: '/avatars/provider2.jpg', rating: 4.8, followers: 12300, services: 8, location: 'Abuja' },
  { id: 'pr3', name: 'Prestige Events', avatar: '/avatars/provider5.jpg', rating: 5.0, followers: 4500, services: 15, location: 'Nationwide' },
  { id: 'pr4', name: 'SpaceCraft Interiors', avatar: '/avatars/provider6.jpg', rating: 4.8, followers: 8900, services: 6, location: 'Lagos & Abuja' },
];

export const feedItems: FeedItem[] = [
  { id: 'f1', type: 'product', image: '/products/watch.jpg', title: 'Just got this amazing watch! #luxury', author: 'Sarah J.', authorAvatar: '/avatars/seller1.jpg', likes: 234, comments: 45 },
  { id: 'f2', type: 'reel', image: '/services/makeup.jpg', title: 'Bridal makeup transformation ✨', author: 'Glam by Ada', authorAvatar: '/avatars/provider2.jpg', likes: 567, comments: 89 },
  { id: 'f3', type: 'product', image: '/products/burger.jpg', title: 'Best burger in town! 🍔', author: 'Foodie Mike', authorAvatar: '/avatars/seller6.jpg', likes: 445, comments: 67 },
  { id: 'f4', type: 'service', image: '/services/interior.jpg', title: 'Before & After: Living room makeover', author: 'SpaceCraft', authorAvatar: '/avatars/provider6.jpg', likes: 389, comments: 52 },
  { id: 'f5', type: 'product', image: '/products/native-wear.jpg', title: 'Loving this Ankara dress! 💃', author: 'Chioma N.', authorAvatar: '/avatars/seller10.jpg', likes: 612, comments: 78 },
  { id: 'f6', type: 'reel', image: '/services/photography.jpg', title: 'Behind the scenes at our studio', author: 'Lens & Light', authorAvatar: '/avatars/provider1.jpg', likes: 298, comments: 34 },
];

export const chats: Chat[] = [
  { id: 'c1', name: 'LuxTime Store', avatar: '/avatars/seller1.jpg', lastMessage: 'Your order has been shipped! Tracking: TR123456', timestamp: '2m ago', unread: 2, isOnline: true },
  { id: 'c2', name: 'Glam by Ada', avatar: '/avatars/provider2.jpg', lastMessage: 'Thank you for booking! See you on Saturday.', timestamp: '1h ago', unread: 1, isOnline: true },
  { id: 'c3', name: 'TechHub', avatar: '/avatars/seller3.jpg', lastMessage: 'The headphones are back in stock!', timestamp: '3h ago', unread: 0, isOnline: false },
  { id: 'c4', name: 'FixIt Plumbing', avatar: '/avatars/provider3.jpg', lastMessage: 'We can come by tomorrow morning at 9 AM.', timestamp: '1d ago', unread: 0, isOnline: false },
  { id: 'c5', name: 'Bella Bags', avatar: '/avatars/seller2.jpg', lastMessage: 'The brown leather bag is available in 3 colors.', timestamp: '2d ago', unread: 0, isOnline: true },
];

export const orders: Order[] = [
  { id: 'o1', product: 'Luxury Gold Chronograph Watch', image: '/products/watch.jpg', price: 299.99, status: 'shipped', date: '2026-06-05', seller: 'LuxTime Store' },
  { id: 'o2', product: 'Wireless Noise-Canceling Headphones', image: '/products/headphones.jpg', price: 189.99, status: 'delivered', date: '2026-06-01', seller: 'TechHub' },
  { id: 'o3', product: 'Bridal & Event Makeup', image: '/services/makeup.jpg', price: 150.00, status: 'pending', date: '2026-06-07', seller: 'Glam by Ada' },
  { id: 'o4', product: 'Gourmet Cheeseburger', image: '/products/burger.jpg', price: 18.99, status: 'delivered', date: '2026-06-06', seller: 'Grill Masters' },
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Amara K.', avatar: '/avatars/seller4.jpg', rating: 5, comment: 'Tradora changed how I shop! Found amazing local sellers and the chat feature makes it so easy to communicate.', date: '2026-05-20' },
  { id: 't2', name: 'David O.', avatar: '/avatars/seller7.jpg', rating: 5, comment: 'As a seller, the dashboard analytics helped me double my sales in just 2 months. Incredible platform!', date: '2026-05-15' },
  { id: 't3', name: 'Ngozi M.', avatar: '/avatars/provider2.jpg', rating: 4, comment: 'Booked a makeup artist for my wedding through Tradora. The booking system was seamless!', date: '2026-05-10' },
];
