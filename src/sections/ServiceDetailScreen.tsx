import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { services } from '@/data';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  UserPlus,
  Check,
  Wrench,
} from 'lucide-react';

export default function ServiceDetailScreen() {
  const { goBack, state, addToCart, navigate } = useApp();
  const { selectedServiceId } = state;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const service = services.find(s => s.id === selectedServiceId);

  if (!service) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Service not found</p>
        <button onClick={goBack} className="ml-2 text-primary">Go Back</button>
      </div>
    );
  }

  const dates = ['Mon 9', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13', 'Sat 14'];
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      setShowBookingForm(true);
      return;
    }
    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image,
      type: 'service',
      seller: service.provider,
    });
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      goBack();
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-primary text-primary' : ''}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Service Image */}
        <div className="relative aspect-video mx-4 mt-2 rounded-2xl overflow-hidden">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          {service.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              {service.badge}
            </span>
          )}
        </div>

        {/* Service Info */}
        <div className="px-4 mt-4">
          <h1 className="text-xl font-bold">{service.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-semibold">{service.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({service.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-2xl font-bold text-primary">${service.price}</span>
            <span className="text-sm text-muted-foreground">/{service.priceUnit.replace('per ', '')}</span>
          </div>

          {/* Provider Info */}
          <div className="flex items-center gap-3 mt-4 p-3 bg-card rounded-xl border border-border/50">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{service.provider}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {service.location}
              </div>
            </div>
            <button className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              <UserPlus className="w-3 h-3" />
              Follow
            </button>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2 p-3 bg-card rounded-xl border border-border/50">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground">Availability</p>
                <p className="text-xs font-medium">{service.availability}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-card rounded-xl border border-border/50">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground">Response</p>
                <p className="text-xs font-medium">Usually within 1h</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">About This Service</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-4 mt-4 py-3 border-y border-border/50">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-1.5 text-sm"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              <span className={isLiked ? 'text-red-500 font-medium' : 'text-muted-foreground'}>
                {service.likes + (isLiked ? 1 : 0)}
              </span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MessageCircle className="w-5 h-5" />
              <span>Comment</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          {/* Booking Calendar */}
          {showBookingForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <h3 className="text-sm font-semibold mb-3">Select Date</h3>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`min-w-[60px] py-2 px-3 rounded-xl text-center text-xs font-medium transition-all ${
                      selectedDate === date
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              <h3 className="text-sm font-semibold mb-3 mt-4">Select Time</h3>
              <div className="flex gap-2 flex-wrap">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-4 rounded-xl text-xs font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="glass border-t border-border/50 px-4 py-3 flex gap-3">
        <button
          onClick={() => navigate('chat', { selectedChatId: service.id })}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-muted text-foreground font-semibold text-sm"
        >
          <MessageCircle className="w-5 h-5" />
          Chat
        </button>
        <button
          onClick={handleBook}
          disabled={bookingConfirmed}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            bookingConfirmed
              ? 'bg-green-500 text-white'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {bookingConfirmed ? (
            <>
              <Check className="w-5 h-5" />
              Booked!
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              {showBookingForm && selectedDate && selectedTime ? 'Confirm Booking' : 'Book Now'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
