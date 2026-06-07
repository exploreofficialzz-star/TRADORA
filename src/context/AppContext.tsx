import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Screen = 'splash' | 'main' | 'productDetail' | 'serviceDetail' | 'chat' | 'search' | 'checkout' | 'sellerDashboard' | 'providerDashboard' | 'adminDashboard';
export type Tab = 'home' | 'feeds' | 'messages' | 'profile';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'product' | 'service';
  seller: string;
}

interface AppState {
  screen: Screen;
  activeTab: Tab;
  previousScreen: Screen | null;
  selectedProductId: string | null;
  selectedServiceId: string | null;
  selectedChatId: string | null;
  cart: CartItem[];
  isDarkMode: boolean;
  isSplashComplete: boolean;
  searchQuery: string;
  notifications: number;
}

interface AppContextType {
  state: AppState;
  navigate: (screen: Screen, params?: Partial<AppState>) => void;
  goBack: () => void;
  setActiveTab: (tab: Tab) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleDarkMode: () => void;
  setSearchQuery: (query: string) => void;
  markSplashComplete: () => void;
  cartTotal: number;
  cartCount: number;
}

const initialState: AppState = {
  screen: 'splash',
  activeTab: 'home',
  previousScreen: null,
  selectedProductId: null,
  selectedServiceId: null,
  selectedChatId: null,
  cart: [],
  isDarkMode: false,
  isSplashComplete: false,
  searchQuery: '',
  notifications: 3,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const navigate = useCallback((screen: Screen, params?: Partial<AppState>) => {
    setState(prev => ({
      ...prev,
      previousScreen: prev.screen,
      screen,
      ...params,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState(prev => ({
      ...prev,
      screen: prev.previousScreen ?? 'main',
      previousScreen: null,
    }));
  }, []);

  const setActiveTab = useCallback((tab: Tab) => {
    setState(prev => ({
      ...prev,
      activeTab: tab,
      screen: 'main',
    }));
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setState(prev => {
      const existing = prev.cart.find(c => c.id === item.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(c =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
          ),
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { ...item, quantity: 1 }],
      };
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(c => c.id !== id),
    }));
  }, []);

  const updateCartQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(c =>
        c.id === id ? { ...c, quantity } : c
      ),
    }));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setState(prev => ({ ...prev, cart: [] }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState(prev => {
      const newMode = !prev.isDarkMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { ...prev, isDarkMode: newMode };
    });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const markSplashComplete = useCallback(() => {
    setState(prev => ({ ...prev, isSplashComplete: true, screen: 'main' }));
  }, []);

  const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        state,
        navigate,
        goBack,
        setActiveTab,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleDarkMode,
        setSearchQuery,
        markSplashComplete,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
