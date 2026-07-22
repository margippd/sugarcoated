export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  material: string;
  colors: string[];
  sizes: string[];
  features: string[];
  styleTip: string;
  isSoldOut?: boolean;
  images?: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  customer: Customer;
  coupon?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "concierge";
  text: string;
  timestamp: Date;
  recommendedProductIds?: string[];
}
