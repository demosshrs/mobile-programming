export interface Ceremony {
  name: string;
  priceStr: string;
  priceNum: number;
}

export interface Purohit {
  id: string;
  name: string;
  experience: string;
  qualification: string;
  rating: number;
  reviews: number;
  priceFrom: string;
  priceRange: string;
  speciality: string;
  location: string;
  phone: string;
  about: string;
  ceremonies: Ceremony[];
  available: boolean;
}

export interface BajaBand {
  id: string;
  name: string;
  type: string;
  rating: string;
  ratingNum: number;
  price: string;
  priceUnit: string;
  priceNum: number;
  members: number;
  available: boolean;
  about: string;
  icon: string;
  iconBg: string;
}

export interface Mantra {
  id: string;
  title: string;
  devanagari: string;
  transliteration: string;
  meaning: string;
}

export interface MantraCategory {
  id: string;
  label: string;
  icon: string;
  count: number;
  mantras: Mantra[];
}

export interface Booking {
  id?: string;
  userId: string;
  purohitId: string;
  purohitName: string;
  ceremony: string;
  date: string;
  time: string;
  address: string;
  total: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: number;
}

export interface User {
  name: string;
  phone: string;
  email: string;
}
