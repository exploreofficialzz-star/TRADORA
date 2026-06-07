import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import type { Tab } from '@/context/AppContext';
import {
  Home,
  LayoutGrid,
  MessageSquare,
  User,
  ShoppingCart,
} from 'lucide-react';
import HomeScreen from '@/pages/HomeScreen';
import FeedsScreen from '@/pages/FeedsScreen';
import MessagesScreen from '@/pages/MessagesScreen';
import ProfileScreen from '@/pages/ProfileScreen';

const tabs: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'feeds', label: 'Feeds', icon: LayoutGrid },
  { key: 'messages', label: 'Messages', icon: MessageSquare },
  { key: 'profile', label: 'Profile', icon: User },
];

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function MainLayout() {
  const { state, setActiveTab, cartCount, navigate } = useApp();
  const { activeTab } = state;

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'feeds':
        return <FeedsScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={() => navigate('checkout')}
          className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        </motion.button>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative flex flex-col items-center justify-center w-16 h-full"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                </motion.div>
                <span
                  className={`text-[10px] mt-0.5 transition-colors ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-0 w-8 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {tab.key === 'messages' && state.notifications > 0 && (
                  <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {state.notifications}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
