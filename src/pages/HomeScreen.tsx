import { useState } from 'react';
import tradoaLogo from '@/assets/tradora-logo.jpg';
import { motion } from 'framer-motion';
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


export default function HomeScreen() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'goods' | 'services'>('goods');
  const [activeCategory, setActiveCategory] = useState<'products' | 'services'>('products');

  const categories = activeCategory === 'products' ? productCategories : serviceCategories;
  const featuredProducts = products.slice(0, 4);
  const featuredServices = services.slice(0, 4);
  const trendingProducts = [...products].sort((a, b) => b.likes - a.likes).slice(0, 4);

  return (
    <div className="min-h-full">
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@800&display=swap" rel="stylesheet" />

      {/* Header — bg flush to top & left edges, only bottom-right curved */}
      <header className="sticky top-0 z-40 flex items-center justify-between pr-4">
        <style>{`
          .tradora-bg {
            background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
            border-radius: 0 0 48px 0;
            padding: 15px 30px 15px 16px;
          }
          .dark .tradora-bg {
            background: linear-gradient(135deg, #161B22 0%, #1F2937 100%);
          }
        `}</style>

        <div className="tradora-bg flex items-center gap-2">
          <img
            src={tradoaLogo}
            alt="Tradora"
            style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover' }}
          />
          <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 30, letterSpacing: '0.04em', lineHeight: 1 }}
            className="text-gray-900 dark:text-white"
          >
            TR<span style={{ color: '#FB8C00' }}>A</span>DOR<span style={{ color: '#FB8C00' }}>A</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('search')} className="w-9 h-9 flex items-center justify-center">
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button className="relative w-9 h-9 flex items-center justify-center">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
          </button>
        </div>
      </header>

      {/* Goods / Services Section */}
      <section className="mt-4">
        {/* Tabs — Goods LEFT, Services RIGHT, pushed toward center */}
        <div className="flex px-24 mb-3 border-b border-border/50">
          <button
            onClick={() => setActiveTab('goods')}
            className={`flex-1 pb-2 text-sm font-bold text-left relative transition-colors ${
              activeTab === 'goods' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Goods
            {activeTab === 'goods' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-12 h-[2.5px] bg-primary rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 pb-2 text-sm font-bold text-right relative transition-colors ${
              activeTab === 'services' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Services
            {activeTab === 'services' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 right-0 w-16 h-[2.5px] bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* Goods — sellers, horizontal scroll */}
        {activeTab === 'goods' && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-3 pb-3">
            {sellers.map((seller, i) => (
              <motion.div
                key={seller.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{ width: 120, height: 200 }}
              >
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(seller.name)}&background=FB8C00&color=fff&size=400`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-2.5 left-2.5 right-2.5 h-[3px] bg-white/20 rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${40 + (i * 18) % 55}%` }} />
                </div>
                <div className="absolute top-6 left-3">
                  <div className="p-[2.5px] rounded-full" style={{ background: 'linear-gradient(135deg, #FB8C00, #FFA726)' }}>
                    <div className="bg-black p-[2px] rounded-full">
                      <div className="w-9 h-9 rounded-full overflow-hidden">
                        <img src={seller.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-bold line-clamp-1">{seller.name}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">
                    {seller.followers >= 1000 ? `${(seller.followers / 1000).toFixed(1)}k` : seller.followers} followers
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-white/70 text-[10px]">{seller.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Services — providers, horizontal scroll */}
        {activeTab === 'services' && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-3 pb-3">
            {providers.map((provider, i) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{ width: 120, height: 200, background: '#0D1117' }}
              >
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=1a1f2e&color=FB8C00&size=400`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute top-2.5 left-2.5 right-2.5 h-[3px] bg-white/20 rounded-full">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: `${35 + (i * 22) % 55}%` }} />
                </div>
                <div className="absolute top-6 left-3">
                  <div className="p-[2.5px] rounded-full" style={{ background: 'linear-gradient(135deg, #60A5FA, #818CF8)' }}>
                    <div className="bg-black p-[2px] rounded-full">
                      <div className="w-9 h-9 rounded-full overflow-hidden">
                        <img src={provider.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-bold line-clamp-1">{provider.name}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{provider.location}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-white/70 text-[10px]">{provider.rating}</span>
                  </div>
                </div>
              </motion.div>
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
