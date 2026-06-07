import { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { useApp } from '@/context/AppContext';
import { products } from '@/data';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  ShoppingCart,
  MessageCircle,
  Store,
  UserPlus,
  Check,
  X,
  RotateCcw,
  ZoomIn,
  Box as BoxIcon,
} from 'lucide-react';
import * as THREE from 'three';

function Product3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body - watch case */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.4, 32]} />
        <meshStandardMaterial color="#D4A574" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Watch face */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[1, 1, 0.05, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Watch crown */}
      <mesh position={[1.3, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#D4A574" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Strap top */}
      <mesh position={[0, 0, -1.6]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.8, 2.5, 0.15]} />
        <meshStandardMaterial color="#2C1810" metalness={0.1} roughness={0.9} />
      </mesh>
      {/* Strap bottom */}
      <mesh position={[0, 0, 1.6]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.8, 2.5, 0.15]} />
        <meshStandardMaterial color="#2C1810" metalness={0.1} roughness={0.9} />
      </mesh>
      {/* Hour markers */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const angle = (i * Math.PI * 2) / 12;
        const x = Math.sin(angle) * 0.7;
        const z = Math.cos(angle) * 0.7;
        return (
          <mesh key={i} position={[x, 0.25, z]}>
            <boxGeometry args={[0.08, 0.05, i % 3 === 0 ? 0.15 : 0.08]} />
            <meshStandardMaterial color="#D4A574" metalness={0.9} roughness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ProductDetailScreen() {
  const { goBack, state, addToCart } = useApp();
  const { selectedProductId } = state;
  const [isLiked, setIsLiked] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Product not found</p>
        <button onClick={goBack} className="ml-2 text-primary">Go Back</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'product',
      seller: product.seller,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Product Image */}
        <div className="relative aspect-square mx-4 mt-2 rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {/* 3D Viewer Toggle */}
          <button
            onClick={() => setShow3D(true)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-foreground text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <BoxIcon className="w-4 h-4 text-primary" />
            View in 3D
          </button>
        </div>

        {/* Product Info */}
        <div className="px-4 mt-4">
          <div className="flex items-start justify-between">
            <h1 className="text-xl font-bold flex-1 pr-4">{product.name}</h1>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{product.reviews} reviews</p>

          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                <span className="text-sm font-semibold text-green-600">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-3 mt-4 p-3 bg-card rounded-xl border border-border/50">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{product.seller}</p>
              <p className="text-xs text-muted-foreground">Verified Seller</p>
            </div>
            <button className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              <UserPlus className="w-3 h-3" />
              Follow
            </button>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Likes & Social */}
          <div className="flex items-center gap-4 mt-4 py-3 border-y border-border/50">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-1.5 text-sm"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              <span className={isLiked ? 'text-red-500 font-medium' : 'text-muted-foreground'}>
                {product.likes + (isLiked ? 1 : 0)}
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

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-6 mb-6">
              <h3 className="text-sm font-semibold mb-3">You May Also Like</h3>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {relatedProducts.map((rp) => (
                  <button
                    key={rp.id}
                    onClick={() => {}}
                    className="min-w-[140px] bg-card rounded-xl overflow-hidden border border-border/50 text-left"
                  >
                    <div className="aspect-square">
                      <img src={rp.image} alt={rp.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium line-clamp-1">{rp.name}</p>
                      <span className="text-sm font-bold text-primary">${rp.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="glass border-t border-border/50 px-4 py-3 flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={addedToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-muted text-foreground'
          }`}
        >
          {addedToCart ? (
            <>
              <Check className="w-5 h-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
        <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
          Buy Now
        </button>
      </div>

      {/* 3D Viewer Overlay */}
      <AnimatePresence>
        {show3D && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <h3 className="text-white font-semibold">3D Product View</h3>
              <button
                onClick={() => setShow3D(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <Suspense fallback={
                <div className="h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <Canvas shadows>
                  <PerspectiveCamera makeDefault position={[0, 2, 5]} />
                  <OrbitControls
                    enablePan={false}
                    minDistance={3}
                    maxDistance={10}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                  />
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                  <directionalLight position={[-5, 3, -5]} intensity={0.3} />
                  <Product3D />
                  <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.4}
                    scale={5}
                    blur={2}
                  />
                  <Environment preset="studio" />
                </Canvas>
              </Suspense>
            </div>
            <div className="px-4 py-4 flex items-center justify-center gap-6 text-white/60 text-xs">
              <span className="flex items-center gap-1">
                <RotateCcw className="w-4 h-4" /> Drag to rotate
              </span>
              <span className="flex items-center gap-1">
                <ZoomIn className="w-4 h-4" /> Pinch to zoom
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
