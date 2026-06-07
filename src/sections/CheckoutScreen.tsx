import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  X,
  CreditCard,
  Smartphone,
  Wallet,
  Check,
  Trash2,
  Plus,
  Minus,
  MapPin,
} from 'lucide-react';

export default function CheckoutScreen() {
  const { goBack, state, cartTotal, cartCount, updateCartQuantity, removeFromCart, clearCart } = useApp();
  const [step, setStep] = useState<'cart' | 'address' | 'payment' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'wallet'>('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      setOrderPlaced(false);
      goBack();
    }, 3000);
  };

  if (state.cart.length === 0 && !orderPlaced) {
    return (
      <div className="h-full flex flex-col bg-background">
        <header className="sticky top-0 z-40 glass px-4 py-3 flex items-center gap-3">
          <button onClick={goBack} className="w-8 h-8 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Shopping Cart</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Wallet className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mt-1 text-center">Browse products and services to add items to your cart</p>
          <button
            onClick={goBack}
            className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3 flex items-center gap-3">
        <button onClick={goBack} className="w-8 h-8 flex items-center justify-center">
          {step === 'cart' ? <X className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
        </button>
        <h1 className="text-lg font-semibold flex-1">
          {step === 'cart' && 'Shopping Cart'}
          {step === 'address' && 'Delivery Address'}
          {step === 'payment' && 'Payment'}
        </h1>
        {step === 'cart' && (
          <button
            onClick={clearCart}
            className="text-xs text-red-500 font-medium"
          >
            Clear All
          </button>
        )}
      </header>

      {/* Progress Steps */}
      {step !== 'success' && (
        <div className="px-4 py-3 flex items-center gap-2">
          {(['cart', 'address', 'payment'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                ['cart', 'address', 'payment'].indexOf(step) >= i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {['cart', 'address', 'payment'].indexOf(step) > i ? (
                  <Check className="w-3 h-3" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-[10px] font-medium capitalize ${
                ['cart', 'address', 'payment'].indexOf(step) >= i ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {s}
              </span>
              {i < 2 && <div className="flex-1 h-0.5 bg-muted rounded-full" />}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3">
        <AnimatePresence mode="wait">
          {step === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {state.cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3 bg-card rounded-xl p-3 border border-border/50"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.seller}</p>
                    <p className="text-sm font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {step === 'address' && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <div className="bg-card rounded-xl p-4 border border-primary/50 border-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Home</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      123 Victoria Island Road,<br />
                      Lagos, Nigeria
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary mt-2">
                      <Check className="w-3 h-3" /> Default Address
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground">
                <Plus className="w-4 h-4" />
                Add New Address
              </button>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {/* Payment Methods */}
              <div className="space-y-2">
                {([
                  { id: 'card' as const, icon: CreditCard, label: 'Credit/Debit Card', sub: '**** **** **** 4242' },
                  { id: 'mobile' as const, icon: Smartphone, label: 'Mobile Money', sub: 'MTN MoMo' },
                  { id: 'wallet' as const, icon: Wallet, label: 'Tradora Wallet', sub: 'Balance: $0.00' },
                ]).map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-3 w-full bg-card rounded-xl p-4 border-2 text-left transition-all ${
                      paymentMethod === method.id ? 'border-primary' : 'border-border/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      paymentMethod === method.id ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <method.icon className={`w-5 h-5 ${
                        paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id ? 'border-primary' : 'border-muted-foreground'
                    }`}>
                      {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-xl p-4 border border-border/50 mt-4">
                <h3 className="text-sm font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${(cartTotal * 0.075).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border/50 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-primary text-lg">${(cartTotal * 1.075).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="glass border-t border-border/50 px-4 py-3">
        {step === 'cart' && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setStep('address')}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
        {step === 'address' && (
          <button
            onClick={() => setStep('payment')}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm"
          >
            Continue to Payment
          </button>
        )}
        {step === 'payment' && (
          <button
            onClick={handlePlaceOrder}
            disabled={orderPlaced}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
              orderPlaced ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'
            }`}
          >
            {orderPlaced ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Order Placed Successfully!
              </span>
            ) : (
              `Pay $${(cartTotal * 1.075).toFixed(2)}`
            )}
          </button>
        )}
      </div>
    </div>
  );
}
