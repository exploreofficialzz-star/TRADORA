import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { products, services, productCategories, serviceCategories, sellers, providers } from '@/data';
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
  MapPin,
  Play,
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

// Seller avatars with gradient rings — like Stories
function SellerStory({ seller, index }: { seller: typeof sellers[0]; index: number }) {
  const gradients = [
    'from-orange-400 to-pink-500',
    'from-purple-500 to-blue-500',
    'from-green-400 to-teal-500',
    'from-yellow-400 to-orange-500',
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-400',
  ];
  const grad = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
      className="flex flex-col items-center min-w-[72px] cursor-pointer"
    >
      {/* Gradient ring */}
      <div className={`bg-gradient-to-br ${grad} p-[2.5px] rounded-full`}>
        <div className="bg-background p-[2px] rounded-full">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(seller.name)}&background=FB8C00&color=fff&size=100`;
              }}
            />
          </div>
        </div>
      </div>
      <span className="text-[10px] font-medium mt-1.5 text-center line-clamp-1 w-full px-1">{seller.name}</span>
    </motion.div>
  );
}

// Service provider reel card
function ServiceReel({ provider, index }: { provider: typeof providers[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="relative min-w-[110px] h-[160px] rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
      style={{ background: 'linear-gradient(160deg, #1a1f2e, #0D1117)' }}
    >
      <img
        src={provider.avatar}
        alt={provider.name}
        className="w-full h-full object-cover opacity-70"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=1a1f2e&color=FB8C00&size=200`;
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      {/* Play button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
        <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-white text-[10px] font-semibold line-clamp-1">{provider.name}</p>
        <p className="text-white/60 text-[9px] line-clamp-1">{provider.location}</p>
      </div>
      {/* Ring indicator */}
      <div className="absolute top-2 left-2 right-2 h-0.5 bg-white/30 rounded-full">
        <div className="h-full bg-orange-400 rounded-full" style={{ width: '60%' }} />
      </div>
    </motion.div>
  );
}

export default function HomeScreen() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'stories' | 'reels'>('stories');
  const [activeCategory, setActiveCategory] = useState<'products' | 'services'>('products');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  const categories = activeCategory === 'products' ? productCategories : serviceCategories;
  const featuredProducts = products.slice(0, 4);
  const featuredServices = services.slice(0, 4);
  const trendingProducts = [...products].sort((a, b) => b.likes - a.likes).slice(0, 4);

  return (
    <div className="min-h-full">
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@800&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: '0.03em', lineHeight: 1 }}
            className="text-gray-900 dark:text-white"
          >
            TR<span style={{ color: '#FB8C00' }}>A</span>DOR<span style={{ color: '#FB8C00' }}>A</span>
          </span>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('search')} className="relative w-9 h-9 flex items-center justify-center">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <button className="relative w-9 h-9 flex items-center justify-center">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stories / Reels Section */}
      <section className="mt-2">
        {/* Tabs */}
        <div className="flex px-4 gap-6 mb-3 border-b border-border/50">
          {(['stories', 'reels'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-semibold capitalize relative transition-colors ${
                activeTab === tab ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {tab === 'stories' ? 'Stories' : 'Reels'}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Stories — sellers with product goods */}
        {activeTab === 'stories' && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-3">
            {sellers.map((seller, i) => (
              <SellerStory key={seller.id} seller={seller} index={i} />
            ))}
          </div>
        )}

        {/* Reels — service providers */}
        {activeTab === 'reels' && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-3">
            {providers.map((provider, i) => (
              <ServiceReel key={provider.id} provider={provider} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="flex bg-muted rounded-lg p-0.5">
            <button
              onClick={() => setActiveCategory('products')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeCategory === 'products' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >Products</button>
            <button
              onClick={() => setActiveCategory('services')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeCategory === 'services' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >Services</button>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center min-w-[72px] bg-muted/60 rounded-2xl p-3 gap-2"
              whileTap={{ scale: 0.94 }}
            >
              <div className="text-primary"><CategoryIcon iconName={cat.icon} /></div>
              <span className="text-[10px] text-center font-medium line-clamp-1">{cat.name}</span>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate('productDetail', { selectedProductId: product.id })}
              className="bg-card rounded-2xl overflow-hidden border border-border/50 text-left"
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{product.badge}</div>
                <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold line-clamp-1">{product.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-bold text-primary">${product.price}</span>
                  {product.originalPrice && <span className="text-[10px] text-muted-foreground line-through">${product.originalPrice}</span>}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-[10px] text-muted-foreground">{product.rating}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Featured Services</h3>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {featuredServices.map((service, i) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="min-w-[160px] bg-card rounded-2xl overflow-hidden border border-border/50 text-left flex-shrink-0"
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative h-24">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold line-clamp-1">{service.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-sm font-bold text-primary">${service.price}<span className="text-[10px] font-normal text-muted-foreground">/{service.priceUnit.replace('per ', '')}</span></span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><MapPin className="w-3 h-3" />{service.location}</span>
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
                  <Trending className="w-3 h-3" /> Hot
                </div>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-medium line-clamp-1">{product.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-primary">${product.price}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Heart className="w-3 h-3" />{product.likes}</span>
                </div>
              </div>
            </motion.button>
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
              <Download className="w-4 h-4" /> App Store
            </button>
            <button className="flex-1 bg-white text-foreground rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
              <Download className="w-4 h-4" /> Play Store
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
