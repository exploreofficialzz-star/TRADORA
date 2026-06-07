import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Star,
  DollarSign,
  Check,
  X,
  ArrowUpRight,
} from 'lucide-react';

export default function ProviderDashboard() {
  const { goBack } = useApp();
  const [activeTab, setActiveTab] = useState<'bookings' | 'earnings' | 'reviews'>('bookings');

  const stats = [
    { label: 'Total Earnings', value: '$8,320', change: '+15%', icon: DollarSign },
    { label: 'Bookings', value: '94', change: '+12%', icon: Calendar },
    { label: 'Clients', value: '67', change: '+8%', icon: Users },
    { label: 'Rating', value: '4.9', change: '+0.2', icon: Star },
  ];

  const bookings = [
    { id: 'BK-001', client: 'Amara K.', service: 'Bridal Makeup', date: '2026-06-15', time: '10:00 AM', status: 'confirmed', amount: 150 },
    { id: 'BK-002', client: 'David O.', service: 'Event Photography', date: '2026-06-18', time: '2:00 PM', status: 'pending', amount: 250 },
    { id: 'BK-003', client: 'Ngozi M.', service: 'Portrait Session', date: '2026-06-10', time: '11:00 AM', status: 'completed', amount: 180 },
    { id: 'BK-004', client: 'Chioma E.', service: 'Bridal Makeup', date: '2026-06-20', time: '9:00 AM', status: 'confirmed', amount: 150 },
  ];

  const reviews = [
    { client: 'Amara K.', rating: 5, comment: 'Absolutely stunning work! Made me feel like a queen on my special day.', date: '2026-06-01' },
    { client: 'David O.', rating: 5, comment: 'Professional and punctual. The photos turned out amazing!', date: '2026-05-28' },
    { client: 'Ngozi M.', rating: 4, comment: 'Great experience overall. Would definitely book again.', date: '2026-05-25' },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-8 h-8 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Provider Dashboard</h1>
            <p className="text-[10px] text-muted-foreground">Glam by Ada</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
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

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {(['bookings', 'earnings', 'reviews'] as const).map(tab => (
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
        {activeTab === 'bookings' && (
          <div className="space-y-3">
            {bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-4 border border-border/50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{booking.service}</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{booking.client}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{booking.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">${booking.amount}</p>
                    {booking.status === 'pending' && (
                      <div className="flex gap-1 mt-2">
                        <button className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </button>
                        <button className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-5 text-white">
              <p className="text-white/80 text-sm">Total Earnings</p>
              <p className="text-3xl font-bold mt-1">$8,320.00</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm">+15% from last month</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Service Revenue', amount: '$7,200', percent: 86 },
                { label: 'Tips', amount: '$620', percent: 8 },
                { label: 'Referral Bonus', amount: '$500', percent: 6 },
              ].map((item, i) => (
                <div key={item.label} className="bg-card rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-bold">{item.amount}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.percent}% of total</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {reviews.map((review, i) => (
              <motion.div
                key={review.client}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl p-4 border border-border/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{review.client.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.client}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3 h-3 ${j < review.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-[10px] text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
