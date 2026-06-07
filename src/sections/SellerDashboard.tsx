import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export default function SellerDashboard() {
  const { goBack } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'analytics'>('overview');

  const stats = [
    { label: 'Total Revenue', value: '$12,450', change: '+12%', up: true, icon: DollarSign },
    { label: 'Total Orders', value: '156', change: '+8%', up: true, icon: ShoppingBag },
    { label: 'Products', value: '48', change: '+3', up: true, icon: Package },
    { label: 'Followers', value: '12.5k', change: '+5%', up: true, icon: Users },
  ];

  const recentOrders = [
    { id: 'ORD-001', product: 'Luxury Gold Watch', customer: 'John D.', amount: 299.99, status: 'completed', date: '2026-06-06' },
    { id: 'ORD-002', product: 'Designer Leather Bag', customer: 'Sarah K.', amount: 149.99, status: 'processing', date: '2026-06-05' },
    { id: 'ORD-003', product: 'Wireless Headphones', customer: 'Mike T.', amount: 189.99, status: 'pending', date: '2026-06-05' },
    { id: 'ORD-004', product: 'Diamond Necklace', customer: 'Lisa M.', amount: 499.99, status: 'completed', date: '2026-06-04' },
  ];

  const topProducts = [
    { name: 'Luxury Gold Watch', sales: 45, revenue: 13499.55, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
    { name: 'Diamond Necklace', sales: 32, revenue: 15999.68, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
    { name: 'Wireless Headphones', sales: 28, revenue: 5319.72, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
    { name: 'Designer Leather Bag', sales: 24, revenue: 3599.76, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80' },
  ];

  const chartData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 72 },
    { day: 'Wed', value: 58 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 65 },
    { day: 'Sat', value: 85 },
    { day: 'Sun', value: 55 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-8 h-8 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Seller Dashboard</h1>
            <p className="text-[10px] text-muted-foreground">LuxTime Store</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {(['overview', 'products', 'orders', 'analytics'] as const).map(tab => (
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
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl p-4 border border-border/50"
                >
                  <div className="flex items-center justify-between">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className={`flex items-center gap-0.5 text-[10px] font-medium ${
                      stat.up ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xl font-bold mt-2">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-muted py-3 rounded-xl font-semibold text-sm">
                <Package className="w-4 h-4" />
                Manage Inventory
              </button>
            </div>

            {/* Recent Orders */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Recent Orders</h3>
              <div className="space-y-2">
                {recentOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{order.product}</p>
                      <p className="text-[10px] text-muted-foreground">{order.customer} · {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${order.amount}</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            {/* Revenue Chart */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-semibold mb-4">Weekly Revenue</h3>
              <div className="flex items-end gap-2 h-40">
                {chartData.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.value / maxValue) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-full bg-primary/80 rounded-t-md min-h-[4px]"
                    />
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Top Products</h3>
              <div className="space-y-2">
                {topProducts.map((product, i) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
                  >
                    <span className="text-lg font-bold text-muted w-6">{i + 1}</span>
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{product.name}</p>
                      <p className="text-[10px] text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <span className="text-sm font-semibold">${product.revenue.toLocaleString()}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">Product management coming soon</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">Full order management coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
