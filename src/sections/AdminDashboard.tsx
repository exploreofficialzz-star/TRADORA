import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  Users,
  ShoppingBag,
  Wrench,
  DollarSign,
  Shield,
  AlertTriangle,
  ArrowUpRight,
  MoreHorizontal,
  BarChart3,
} from 'lucide-react';

export default function AdminDashboard() {
  const { goBack } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'listings' | 'financials'>('overview');

  const platformStats = [
    { label: 'Total Users', value: '24,521', change: '+8%', icon: Users },
    { label: 'Active Sellers', value: '1,245', change: '+12%', icon: ShoppingBag },
    { label: 'Service Providers', value: '892', change: '+6%', icon: Wrench },
    { label: 'Platform Revenue', value: '$284k', change: '+18%', icon: DollarSign },
  ];

  const recentUsers = [
    { name: 'Amara K.', email: 'amara@email.com', type: 'Customer', status: 'active', joined: '2026-06-06' },
    { name: 'LuxTime Store', email: 'luxtime@store.com', type: 'Seller', status: 'active', joined: '2026-06-05' },
    { name: 'Glam by Ada', email: 'ada@glam.com', type: 'Provider', status: 'verified', joined: '2026-06-04' },
    { name: 'John Doe', email: 'john@email.com', type: 'Customer', status: 'pending', joined: '2026-06-04' },
  ];

  const flaggedItems = [
    { type: 'product', name: 'Suspicious Electronics', reason: 'Potential counterfeit', severity: 'high' },
    { type: 'review', name: 'Fake Review Pattern', reason: 'Multiple 5-star reviews from same IP', severity: 'medium' },
    { type: 'user', name: 'Unverified Seller', reason: 'Missing verification documents', severity: 'low' },
  ];

  const weeklyRevenue = [
    { day: 'Mon', revenue: 12500 },
    { day: 'Tue', revenue: 18200 },
    { day: 'Wed', revenue: 15600 },
    { day: 'Thu', revenue: 24100 },
    { day: 'Fri', revenue: 19800 },
    { day: 'Sat', revenue: 22400 },
    { day: 'Sun', revenue: 16800 },
  ];

  const maxRevenue = Math.max(...weeklyRevenue.map(d => d.revenue));

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-8 h-8 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {(['overview', 'users', 'listings', 'financials'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Platform Stats */}
            <div className="grid grid-cols-2 gap-3">
              {platformStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl p-4 border border-border/50"
                >
                  <div className="flex items-center justify-between">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="flex items-center gap-0.5 text-[10px] font-medium text-green-600">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xl font-bold mt-2">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-semibold mb-4">Weekly Platform Revenue</h3>
              <div className="flex items-end gap-2 h-32">
                {weeklyRevenue.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-muted-foreground">${(d.revenue / 1000).toFixed(0)}k</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="w-full bg-primary/80 rounded-t-md min-h-[4px]"
                    />
                    <span className="text-[9px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flagged Items */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                Flagged Items
              </h3>
              <div className="space-y-2">
                {flaggedItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      item.severity === 'high' ? 'bg-red-500' :
                      item.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.reason}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${
                      item.severity === 'high' ? 'bg-red-100 text-red-700' :
                      item.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.severity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-2">
            {recentUsers.map((user, i) => (
              <motion.div
                key={user.email}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{user.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{user.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' :
                      user.status === 'verified' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">Listing moderation tools coming soon</p>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">Financial dashboard coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
