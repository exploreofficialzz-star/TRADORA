import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { orders } from '@/data';
import {
  Settings,
  Package,
  Heart,
  Bookmark,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Clock,
  Check,
  Truck,
  XCircle,
  User,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';

type OrderFilter = 'all' | 'pending' | 'processing' | 'delivered' | 'cancelled';

export default function ProfileScreen() {
  const { state, toggleDarkMode, navigate } = useApp();
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('all');
  const [showSettings, setShowSettings] = useState(false);

  const filteredOrders = orderFilter === 'all'
    ? orders
    : orders.filter(o => o.status === orderFilter);

  const stats = [
    { label: 'Orders', value: '24', icon: Package },
    { label: 'Favorites', value: '12', icon: Heart },
    { label: 'Saved', value: '8', icon: Bookmark },
    { label: 'Reviews', value: '5', icon: Star },
  ];

  const menuItems = [
    { icon: MapPin, label: 'My Addresses', badge: null },
    { icon: CreditCard, label: 'Payment Methods', badge: null },
    { icon: Bell, label: 'Notifications', badge: '3' },
    { icon: Shield, label: 'Security', badge: null },
    { icon: HelpCircle, label: 'Help & Support', badge: null },
  ];

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    processing: { color: 'bg-blue-100 text-blue-700', icon: Package },
    shipped: { color: 'bg-purple-100 text-purple-700', icon: Truck },
    delivered: { color: 'bg-green-100 text-green-700', icon: Check },
    cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle },
  };

  if (showSettings) {
    return (
      <div className="h-full bg-background">
        <header className="sticky top-0 z-40 glass px-4 py-3 flex items-center gap-3">
          <button onClick={() => setShowSettings(false)} className="w-8 h-8 flex items-center justify-center">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-lg font-semibold">Settings</h1>
        </header>
        <div className="px-4 py-4 space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between bg-card rounded-xl p-4 border border-border/50">
            <span className="text-sm font-medium">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-7 rounded-full transition-colors ${
                state.isDarkMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <motion.div
                animate={{ x: state.isDarkMode ? 20 : 2 }}
                className="w-5 h-5 rounded-full bg-white shadow-sm"
              />
            </button>
          </div>
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 w-full bg-card rounded-xl p-4 border border-border/50 text-left"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
          <button className="flex items-center gap-3 w-full bg-red-50 rounded-xl p-4 text-left mt-6">
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-red-500">Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">My Profile</h1>
        <button onClick={() => setShowSettings(true)} className="w-10 h-10 flex items-center justify-center">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      {/* User Card */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold">John Doe</h2>
              <p className="text-white/80 text-sm">john.doe@email.com</p>
              <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                <Star className="w-3 h-3 fill-white" />
                Premium Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-3 border border-border/50 flex flex-col items-center text-center"
            >
              <stat.icon className="w-5 h-5 text-primary mb-1" />
              <span className="text-lg font-bold">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('sellerDashboard')}
            className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border/50 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Seller Mode</p>
              <p className="text-[10px] text-muted-foreground">Manage your store</p>
            </div>
          </button>
          <button
            onClick={() => navigate('providerDashboard')}
            className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border/50 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Provider Mode</p>
              <p className="text-[10px] text-muted-foreground">Manage services</p>
            </div>
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <div className="mt-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">My Orders</h3>
        </div>

        {/* Order Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
          {(['all', 'pending', 'processing', 'delivered', 'cancelled'] as OrderFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setOrderFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                orderFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Order List */}
        <div className="px-4 space-y-3 pb-6">
          {filteredOrders.map((order, i) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-4 border border-border/50"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium line-clamp-1">{order.product}</h4>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.seller}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-primary">${order.price.toFixed(2)}</span>
                      <span className="text-[10px] text-muted-foreground">{order.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
