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
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'],
    category: 'jewelry',
    rating: 4.9,
    reviews: 128,
    seller: 'LuxTime Store',
    sellerAvatar: 'https://i.pravatar.cc/100?img=1',
    description: 'Premium chronograph watch with genuine leather strap and gold-plated case. Water-resistant up to 50m.',
    likes: 342,
    badge: 'Trending',
  },
  {
    id: 'p2',
    name: 'Designer Leather Crossbody Bag',
    price: 149.99,
    originalPrice: 220.00,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80'],
    category: 'bags',
    rating: 4.8,
    reviews: 96,
    seller: 'Bella Bags',
    sellerAvatar: 'https://i.pravatar.cc/100?img=2',
    description: 'Handcrafted genuine leather bag with gold-tone hardware. Perfect for everyday elegance.',
    likes: 256,
    badge: 'Best Seller',
  },
  {
    id: 'p3',
    name: 'Wireless Noise-Canceling Headphones',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80'],
    category: 'electronics',
    rating: 4.7,
    reviews: 215,
    seller: 'TechHub',
    sellerAvatar: 'https://i.pravatar.cc/100?img=3',
    description: 'Studio-quality sound with active noise cancellation. 30-hour battery life.',
    likes: 189,
  },
  {
    id: 'p4',
    name: 'Classic Red Stiletto Heels',
    price: 89.99,
    originalPrice: 130.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'],
    category: 'shoes',
    rating: 4.6,
    reviews: 78,
    seller: 'ShoeVogue',
    sellerAvatar: 'https://i.pravatar.cc/100?img=4',
    description: 'Glossy patent leather pumps with a 4-inch heel. Comfortable cushioned insole.',
    likes: 312,
  },
  {
    id: 'p5',
    name: 'Modern Minimalist Sofa',
    price: 899.99,
    originalPrice: 1200.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'],
    category: 'furniture',
    rating: 4.9,
    reviews: 45,
    seller: 'HomeLux Furnishings',
    sellerAvatar: 'https://i.pravatar.cc/100?img=5',
    description: 'Scandinavian design 3-seater sofa with premium fabric upholstery. Free delivery.',
    likes: 167,
    badge: 'Featured',
  },
  {
    id: 'p6',
    name: 'Gourmet Cheeseburger',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'],
    category: 'food',
    rating: 4.8,
    reviews: 334,
    seller: 'Grill Masters',
    sellerAvatar: 'https://i.pravatar.cc/100?img=6',
    description: 'Double patty, melted cheddar, fresh lettuce and tomato on a brioche bun.',
    likes: 445,
    badge: 'Popular',
  },
  {
    id: 'p7',
    name: 'Flagship 5G Smartphone',
    price: 699.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'],
    category: 'phones',
    rating: 4.7,
    reviews: 512,
    seller: 'MobileZone',
    sellerAvatar: 'https://i.pravatar.cc/100?img=7',
    description: 'Latest flagship with 120Hz AMOLED display, triple camera system, and 5000mAh battery.',
    likes: 678,
  },
  {
    id: 'p8',
    name: 'Diamond Pendant Necklace',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80'],
    category: 'jewelry',
    rating: 4.9,
    reviews: 89,
    seller: 'Royal Gems',
    sellerAvatar: 'https://i.pravatar.cc/100?img=8',
    description: '18K gold chain with certified diamond pendant. Comes in luxury gift box.',
    likes: 523,
    badge: 'Premium',
  },
  {
    id: 'p9',
    name: 'Açaí Superfood Bowl',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'],
    category: 'food',
    rating: 4.6,
    reviews: 201,
    seller: 'Healthy Bites',
    sellerAvatar: 'https://i.pravatar.cc/100?img=9',
    description: 'Fresh açaí topped with granola, seasonal berries, banana, and coconut flakes.',
    likes: 289,
  },
  {
    id: 'p10',
    name: 'African Print Maxi Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80'],
    category: 'native',
    rating: 4.8,
    reviews: 156,
    seller: 'AfroChic Fashion',
    sellerAvatar: 'https://i.pravatar.cc/100?img=10',
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
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80'],
    category: 'photography',
    rating: 4.9,
    reviews: 87,
    provider: 'Lens & Light Studio',
    providerAvatar: 'https://i.pravatar.cc/100?img=11',
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
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80'],
    category: 'makeup',
    rating: 4.8,
    reviews: 134,
    provider: 'Glam by Ada',
    providerAvatar: 'https://i.pravatar.cc/100?img=12',
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'],
    category: 'plumbing',
    rating: 4.7,
    reviews: 203,
    provider: 'FixIt Plumbing',
    providerAvatar: 'https://i.pravatar.cc/100?img=13',
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
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80'],
    category: 'design',
    rating: 4.9,
    reviews: 56,
    provider: 'Creative Studio NG',
    providerAvatar: 'https://i.pravatar.cc/100?img=14',
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
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80'],
    category: 'events',
    rating: 5.0,
    reviews: 42,
    provider: 'Prestige Events',
    providerAvatar: 'https://i.pravatar.cc/100?img=15',
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
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80'],
    category: 'interior',
    rating: 4.8,
    reviews: 91,
    provider: 'SpaceCraft Interiors',
    providerAvatar: 'https://i.pravatar.cc/100?img=16',
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
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80'],
    category: 'cleaning',
    rating: 4.6,
    reviews: 178,
    provider: 'Sparkle Clean Co.',
    providerAvatar: 'https://i.pravatar.cc/100?img=17',
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
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80'],
    category: 'marketing',
    rating: 4.7,
    reviews: 73,
    provider: 'GrowthHackers NG',
    providerAvatar: 'https://i.pravatar.cc/100?img=18',
    description: 'Social media management, SEO, content marketing, and paid ads. Monthly reports included.',
    likes: 189,
    location: 'Remote',
    availability: 'Ongoing',
  },
];

export const sellers: Seller[] = [
  { id: 'se1', name: 'LuxTime Store', avatar: 'https://i.pravatar.cc/100?img=19', rating: 4.9, followers: 12500, products: 48 },
  { id: 'se2', name: 'Bella Bags', avatar: 'https://i.pravatar.cc/100?img=20', rating: 4.8, followers: 8900, products: 32 },
  { id: 'se3', name: 'TechHub', avatar: 'https://i.pravatar.cc/100?img=21', rating: 4.7, followers: 22100, products: 156 },
  { id: 'se4', name: 'AfroChic Fashion', avatar: 'https://i.pravatar.cc/100?img=22', rating: 4.8, followers: 15600, products: 89 },
];

export const providers: Provider[] = [
  { id: 'pr1', name: 'Lens & Light Studio', avatar: 'https://i.pravatar.cc/100?img=23', rating: 4.9, followers: 6700, services: 12, location: 'Lagos' },
  { id: 'pr2', name: 'Glam by Ada', avatar: 'https://i.pravatar.cc/100?img=24', rating: 4.8, followers: 12300, services: 8, location: 'Abuja' },
  { id: 'pr3', name: 'Prestige Events', avatar: 'https://i.pravatar.cc/100?img=25', rating: 5.0, followers: 4500, services: 15, location: 'Nationwide' },
  { id: 'pr4', name: 'SpaceCraft Interiors', avatar: 'https://i.pravatar.cc/100?img=26', rating: 4.8, followers: 8900, services: 6, location: 'Lagos & Abuja' },
];

export const feedItems: FeedItem[] = [
  { id: 'f1', type: 'product', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', title: 'Just got this amazing watch! #luxury', author: 'Sarah J.', authorAvatar: 'https://i.pravatar.cc/100?img=27', likes: 234, comments: 45 },
  { id: 'f2', type: 'reel', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80', title: 'Bridal makeup transformation ✨', author: 'Glam by Ada', authorAvatar: 'https://i.pravatar.cc/100?img=28', likes: 567, comments: 89 },
  { id: 'f3', type: 'product', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', title: 'Best burger in town! 🍔', author: 'Foodie Mike', authorAvatar: 'https://i.pravatar.cc/100?img=29', likes: 445, comments: 67 },
  { id: 'f4', type: 'service', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80', title: 'Before & After: Living room makeover', author: 'SpaceCraft', authorAvatar: 'https://i.pravatar.cc/100?img=30', likes: 389, comments: 52 },
  { id: 'f5', type: 'product', image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&q=80', title: 'Loving this Ankara dress! 💃', author: 'Chioma N.', authorAvatar: 'https://i.pravatar.cc/100?img=31', likes: 612, comments: 78 },
  { id: 'f6', type: 'reel', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80', title: 'Behind the scenes at our studio', author: 'Lens & Light', authorAvatar: 'https://i.pravatar.cc/100?img=32', likes: 298, comments: 34 },
];

export const chats: Chat[] = [
  { id: 'c1', name: 'LuxTime Store', avatar: 'https://i.pravatar.cc/100?img=33', lastMessage: 'Your order has been shipped! Tracking: TR123456', timestamp: '2m ago', unread: 2, isOnline: true },
  { id: 'c2', name: 'Glam by Ada', avatar: 'https://i.pravatar.cc/100?img=34', lastMessage: 'Thank you for booking! See you on Saturday.', timestamp: '1h ago', unread: 1, isOnline: true },
  { id: 'c3', name: 'TechHub', avatar: 'https://i.pravatar.cc/100?img=35', lastMessage: 'The headphones are back in stock!', timestamp: '3h ago', unread: 0, isOnline: false },
  { id: 'c4', name: 'FixIt Plumbing', avatar: 'https://i.pravatar.cc/100?img=36', lastMessage: 'We can come by tomorrow morning at 9 AM.', timestamp: '1d ago', unread: 0, isOnline: false },
  { id: 'c5', name: 'Bella Bags', avatar: 'https://i.pravatar.cc/100?img=37', lastMessage: 'The brown leather bag is available in 3 colors.', timestamp: '2d ago', unread: 0, isOnline: true },
];

export const orders: Order[] = [
  { id: 'o1', product: 'Luxury Gold Chronograph Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', price: 299.99, status: 'shipped', date: '2026-06-05', seller: 'LuxTime Store' },
  { id: 'o2', product: 'Wireless Noise-Canceling Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', price: 189.99, status: 'delivered', date: '2026-06-01', seller: 'TechHub' },
  { id: 'o3', product: 'Bridal & Event Makeup', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80', price: 150.00, status: 'pending', date: '2026-06-07', seller: 'Glam by Ada' },
  { id: 'o4', product: 'Gourmet Cheeseburger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', price: 18.99, status: 'delivered', date: '2026-06-06', seller: 'Grill Masters' },
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Amara K.', avatar: 'https://i.pravatar.cc/100?img=38', rating: 5, comment: 'Tradora changed how I shop! Found amazing local sellers and the chat feature makes it so easy to communicate.', date: '2026-05-20' },
  { id: 't2', name: 'David O.', avatar: 'https://i.pravatar.cc/100?img=39', rating: 5, comment: 'As a seller, the dashboard analytics helped me double my sales in just 2 months. Incredible platform!', date: '2026-05-15' },
  { id: 't3', name: 'Ngozi M.', avatar: 'https://i.pravatar.cc/100?img=40', rating: 4, comment: 'Booked a makeup artist for my wedding through Tradora. The booking system was seamless!', date: '2026-05-10' },
];
