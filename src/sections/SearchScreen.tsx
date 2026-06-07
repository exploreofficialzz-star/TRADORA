import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { products, services } from '@/data';
import {
  ArrowLeft,
  Search,
  X,
  SlidersHorizontal,
  Star,
} from 'lucide-react';

export default function SearchScreen() {
  const { goBack, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');

  const categories = ['all', ...new Set([...products.map(p => p.category), ...services.map(s => s.category)])];

  const allItems = [
    ...products.map(p => ({ ...p, type: 'product' as const })),
    ...services.map(s => ({ ...s, type: 'service' as const, name: s.name, price: s.price, image: s.image, seller: s.provider, rating: s.rating, reviews: s.reviews, likes: s.likes, id: s.id })),
  ];

  const filteredItems = useMemo(() => {
    let items = allItems;

    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.seller.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    items = items.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items = [...items].sort((a, b) => b.rating - a.rating);
        break;
    }

    return items;
  }, [query, selectedCategory, priceRange, sortBy]);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-8 h-8 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products, services..."
              autoFocus
              className="w-full bg-muted rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              showFilters ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 bg-muted/50 border-b border-border/50 space-y-3">
              {/* Category Filter */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Category</p>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize transition-all ${
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </p>
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>

              {/* Sort */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Sort By</p>
                <div className="flex gap-2">
                  {(['relevance', 'price-low', 'price-high', 'rating'] as const).map(sort => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`px-3 py-1 rounded-full text-[10px] font-medium capitalize transition-all ${
                        sortBy === sort
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {sort === 'price-low' ? 'Price: Low to High' :
                       sort === 'price-high' ? 'Price: High to Low' :
                       sort === 'rating' ? 'Top Rated' : 'Relevance'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3">
        <p className="text-xs text-muted-foreground mb-3">
          {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
        </p>
        <div className="space-y-3">
          {filteredItems.map((item, i) => (
            <motion.button
              key={`${item.type}-${item.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => {
                if (item.type === 'product') {
                  navigate('productDetail', { selectedProductId: item.id });
                } else {
                  navigate('serviceDetail', { selectedServiceId: item.id });
                }
              }}
              className="flex gap-3 bg-card rounded-xl overflow-hidden border border-border/50 text-left w-full"
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full capitalize">
                  {item.type}
                </span>
              </div>
              <div className="flex-1 py-2 pr-3">
                <h4 className="text-sm font-semibold line-clamp-1">{item.name}</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-[11px]">{item.rating}</span>
                  <span className="text-[11px] text-muted-foreground">({item.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-primary">${item.price}</span>
                  <span className="text-[10px] text-muted-foreground">{item.seller}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
