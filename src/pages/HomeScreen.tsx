import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { products, services, productCategories, serviceCategories, sellers, providers, testimonials } from '@/data';
import tradoaLogo from '@/assets/tradora-logo.jpg';
import {
  Search,
  Bell,
  Star,
  Heart,
  ChevronRight,
  ShoppingBag,
  Wrench,
  Sparkles,
  Shirt,
  Footprints,
  Gem,
  Smartphone,
  Sofa,
  Headphones,
  UtensilsCrossed,
  Camera,
  Scissors,
  PenTool,
  Code,
  BookOpen,
  Home,
  Calendar,
  Droplets,
  TrendingUp as Trending,
  Download,
  Quote,
  MapPin,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shirt, Sparkles, Footprints, ShoppingBag, Gem, Smartphone,
  Headphones, Sofa, UtensilsCrossed,
  Scissors, Camera, PenTool, Code,
  Droplets, BookOpen, Home, Calendar, Wrench,
};

function CategoryIcon({ iconName }: { iconName: string }) {
  const Icon = iconMap[iconName] || ShoppingBag;
  return <Icon className="w-5 h-5" />;
}

export default function HomeScreen() {
  const { navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState<'products' | 'services'>('products');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const categories = activeCategory === 'products' ? productCategories : serviceCategories;
  const featuredProducts = products.slice(0, 4);
  const featuredServices = services.slice(0, 4);
  const trendingProducts = [...products].sort((a, b) => b.likes - a.likes).slice(0, 4);

  return (
    <div className="min-h-full">
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@800&display=swap" rel="stylesheet" />
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Logo + brand name */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src={tradoaLogo}
              alt="Tradora"
              style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }}
            />
            <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: '0.03em' }}
              className="text-gray-900 dark:text-white"
            >
              TR<span style={{ color: '#FB8C00' }}>A</span>DOR<span style={{ color: '#FB8C00' }}>A</span>
            </span>
          </div>
          {/* Search bar — moderate width */}
          <div className="flex-1 relative">
            <button
              onClick={() => navigate('search')}
              className="w-full flex items-center gap-2 bg-muted rounded-xl px-3 py-2 text-xs text-muted-foreground"
            >
              <Search className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Search products & services...</span>
            </button>
          </div>
          <button className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-52 mx-4 mt-4 rounded-2xl overflow-hidden"
      >
        <img
          src="/hero-banner.jpg"
          alt="Premium marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary text-xs font-bold tracking-wider uppercase mb-1"
          >
            Premium Marketplace
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-2xl font-bold leading-tight"
          >
            Discover Local<br />Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-sm mt-2"
          >
            Shop, sell & book services
          </motion.p>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="flex bg-muted rounded-lg p-0.5">
            <button
              onClick={() => setActiveCategory('products')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeCategory === 'products'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveCategory('services')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeCategory === 'services'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Services
            </button>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-1.5 min-w-[64px]"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-primary">
                <CategoryIcon iconName={cat.icon} />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Featured Products</h3>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product, i) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate('productDetail', { selectedProductId: product.id })}
              className="bg-card rounded-xl overflow-hidden border border-border/50 text-left"
              whileTap={{ scale: 0.96 }}
            >
              <div className="relative aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
                <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium line-clamp-1">{product.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-[10px] text-muted-foreground">{product.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Top Services</h3>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {featuredServices.map((service, i) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate('serviceDetail', { selectedServiceId: service.id })}
              className="flex gap-3 bg-card rounded-xl overflow-hidden border border-border/50 text-left w-full"
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-28 h-28 flex-shrink-0">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                {service.badge && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {service.badge}
                  </span>
                )}
              </div>
              <div className="flex-1 py-2 pr-3">
                <h4 className="text-sm font-semibold line-clamp-1">{service.name}</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-[11px]">{service.rating}</span>
                  <span className="text-[11px] text-muted-foreground">({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-sm font-bold text-primary">
                    ${service.price}<span className="text-[10px] font-normal text-muted-foreground">/{service.priceUnit.replace('per ', '')}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />{service.location}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="mt-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trending className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Trending Now</h3>
          </div>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
          {trendingProducts.map((product, i) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate('productDetail', { selectedProductId: product.id })}
              className="min-w-[140px] bg-card rounded-xl overflow-hidden border border-border/50 text-left"
              whileTap={{ scale: 0.96 }}
            >
              <div className="relative aspect-[3/4]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Trending className="w-3 h-3" />
                  Hot
                </div>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-medium line-clamp-1">{product.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-primary">${product.price}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Heart className="w-3 h-3" />{product.likes}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Top Sellers */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Top Sellers</h3>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {sellers.map((seller, i) => (
            <motion.div
              key={seller.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center min-w-[80px]"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-orange-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {seller.rating}
                </div>
              </div>
              <span className="text-[11px] font-medium mt-2 text-center line-clamp-1">{seller.name}</span>
              <span className="text-[10px] text-muted-foreground">{seller.followers >= 1000 ? `${(seller.followers / 1000).toFixed(1)}k` : seller.followers} followers</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Service Providers */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Top Providers</h3>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {providers.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center min-w-[80px]"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <Wrench className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {provider.rating}
                </div>
              </div>
              <span className="text-[11px] font-medium mt-2 text-center line-clamp-1">{provider.name}</span>
              <span className="text-[10px] text-muted-foreground">{provider.location}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 mt-6">
        <h3 className="text-lg font-semibold mb-3">What People Say</h3>
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-4 border border-border/50"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Quote className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{t.name}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3 h-3 ${j < t.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t.comment}</p>
                  <span className="text-[10px] text-muted-foreground mt-2 block">{t.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App Download CTA */}
      <section className="px-4 mt-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-5 text-white">
          <h4 className="text-lg font-bold">Get the TRADORA App</h4>
          <p className="text-white/80 text-sm mt-1">Shop and book services on the go!</p>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-white text-foreground rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
              <Download className="w-4 h-4" />
              App Store
            </button>
            <button className="flex-1 bg-white text-foreground rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
              <Download className="w-4 h-4" />
              Play Store
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
