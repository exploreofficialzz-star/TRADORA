import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import SplashScreen from '@/sections/SplashScreen';
import MainLayout from '@/sections/MainLayout';
import ProductDetailScreen from '@/sections/ProductDetailScreen';
import ServiceDetailScreen from '@/sections/ServiceDetailScreen';
import SearchScreen from '@/sections/SearchScreen';
import CheckoutScreen from '@/sections/CheckoutScreen';
import SellerDashboard from '@/sections/SellerDashboard';
import ProviderDashboard from '@/sections/ProviderDashboard';
import AdminDashboard from '@/sections/AdminDashboard';

const screenVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function App() {
  const { state } = useApp();
  const { screen } = state;

  // Show splash screen
  if (screen === 'splash') {
    return <SplashScreen />;
  }

  // Main app with tabs
  if (screen === 'main') {
    return <MainLayout />;
  }

  // Stack-based navigation for detail screens
  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Base layer: Main layout always visible underneath */}
      <div className="absolute inset-0">
        <MainLayout />
      </div>

      {/* Overlay screens */}
      <AnimatePresence mode="wait">
        {screen === 'productDetail' && (
          <motion.div
            key="productDetail"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] bg-background"
          >
            <ProductDetailScreen />
          </motion.div>
        )}

        {screen === 'serviceDetail' && (
          <motion.div
            key="serviceDetail"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] bg-background"
          >
            <ServiceDetailScreen />
          </motion.div>
        )}

        {screen === 'search' && (
          <motion.div
            key="search"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] bg-background"
          >
            <SearchScreen />
          </motion.div>
        )}

        {screen === 'checkout' && (
          <motion.div
            key="checkout"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] bg-background"
          >
            <CheckoutScreen />
          </motion.div>
        )}

        {screen === 'sellerDashboard' && (
          <motion.div
            key="sellerDashboard"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] bg-background"
          >
            <SellerDashboard />
          </motion.div>
        )}

        {screen === 'providerDashboard' && (
          <motion.div
            key="providerDashboard"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] bg-background"
          >
            <ProviderDashboard />
          </motion.div>
        )}

        {screen === 'adminDashboard' && (
          <motion.div
            key="adminDashboard"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] bg-background"
          >
            <AdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
