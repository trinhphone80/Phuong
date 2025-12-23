
export interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  product: string;
  createdAt: number;
}

export interface AppConfig {
  heroImageUrl: string;
  specsImageUrl: string;
  thumbImageUrl: string;
  galleryImageUrls: string[];
  googleSheetUrl: string; // Thêm trường này
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AdminView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  CLOSED = 'CLOSED'
}
