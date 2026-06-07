import { useState } from 'react';
import { motion } from 'framer-motion';
import { feedItems, products, services } from '@/data';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Play,
} from 'lucide-react';

type FeedTab = 'discover' | 'reels';

export default function FeedsScreen() {
  const [activeTab, setActiveTab] = useState<FeedTab>('discover');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const combinedFeed = [
    ...feedItems,
    ...products.slice(0, 3).map(p => ({
      id: `fp-${p.id}`,
      type: 'product' as const,
      image: p.image,
      title: p.name,
      author: p.seller,
      authorAvatar: p.sellerAvatar,
      likes: p.likes,
      comments: p.reviews,
    })),
    ...services.slice(0, 2).map(s => ({
      id: `fs-${s.id}`,
      type: 'service' as const,
      image: s.image,
      title: s.name,
      author: s.provider,
      authorAvatar: s.providerAvatar,
      likes: s.likes,
      comments: s.reviews,
    })),
  ];

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3">
        <h1 className="text-xl font-bold text-center mb-3">Feeds</h1>
        <div className="flex bg-muted rounded-xl p-1">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'discover'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('reels')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'reels'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            Reels
          </button>
        </div>
      </header>

      {activeTab === 'discover' ? (
        /* Masonry-style Grid Feed */
        <div className="px-4 mt-4 pb-6">
          <div className="grid grid-cols-2 gap-3">
            {combinedFeed.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative rounded-xl overflow-hidden ${
                  i % 3 === 0 ? 'row-span-2' : ''
                }`}
              >
                <div className={`relative ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Type badge */}
                  <span className="absolute top-2 left-2 bg-white/90 text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                    {item.type}
                  </span>

                  {/* Play button for reels */}
                  {item.type === 'reel' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-medium line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-[8px] text-primary font-bold">
                            {item.author.charAt(0)}
                          </span>
                        </div>
                        <span className="text-white/80 text-[10px]">{item.author}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute right-2 bottom-2 flex flex-col gap-2">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedItems.has(item.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-white'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => toggleSave(item.id)}
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedItems.has(item.id)
                            ? 'fill-primary text-primary'
                            : 'text-white'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Reels - Full Width Cards */
        <div className="mt-4 pb-6 space-y-4 px-4">
          {combinedFeed
            .filter(item => item.type === 'reel' || item.type === 'service')
            .map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-[70vh]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Side actions */}
                <div className="absolute right-4 bottom-20 flex flex-col items-center gap-5">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <Heart
                      className={`w-7 h-7 ${
                        likedItems.has(item.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-white'
                      }`}
                    />
                    <span className="text-white text-[10px] font-medium">
                      {(item.likes + (likedItems.has(item.id) ? 1 : 0)).toLocaleString()}
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <MessageCircle className="w-7 h-7 text-white" />
                    <span className="text-white text-[10px] font-medium">{item.comments}</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <Share2 className="w-7 h-7 text-white" />
                    <span className="text-white text-[10px] font-medium">Share</span>
                  </button>
                  <button
                    onClick={() => toggleSave(item.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <Bookmark
                      className={`w-7 h-7 ${
                        savedItems.has(item.id) ? 'fill-primary text-primary' : 'text-white'
                      }`}
                    />
                    <span className="text-white text-[10px] font-medium">Save</span>
                  </button>
                  <button>
                    <MoreHorizontal className="w-7 h-7 text-white" />
                  </button>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-4 left-4 right-16">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs text-primary-foreground font-bold">
                        {item.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-white text-sm font-medium">{item.author}</span>
                    <button className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full">
                      Follow
                    </button>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{item.title}</p>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
