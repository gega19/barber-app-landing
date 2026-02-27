import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://barber-api.corporacionceg.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// App Version API
export interface AppVersion {
  id: string;
  version: string;
  versionCode: number;
  apkUrl: string;
  apkSize: number;
  releaseNotes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Top Barbers and Workplaces interfaces
export interface TopBarber {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  avatar?: string | null;
  avatarSeed?: string | null;
  rating: number;
  specialties?: string[];
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  workplaceId?: string | null;
}

export interface TopWorkplace {
  id: string;
  name: string;
  address?: string | null;
  city?: string | null;
  image?: string | null;
  banner?: string | null;
  rating: number;
  reviews: number;
  barbersCount?: number;
  reviewsCount?: number;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description?: string | null;
}

export interface AvailableSlots {
  date: string;
  availableSlots: string[];
}

export interface Appointment {
  id: string;
  barberId: string;
  serviceId?: string;
  date: string;
  time: string;
  status: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type?: string | null;
}

export const appApi = {
  getActiveVersion: async (): Promise<AppVersion> => {
    const response = await api.get<{ success: boolean; data: AppVersion }>('/app/version');
    return response.data.data;
  },

  downloadApk: async (versionId: string): Promise<Blob> => {
    const response = await api.get(`/app/download/${versionId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  get: async (url: string) => {
    return await api.get(url);
  },

  getTopBarbers: async (limit: number = 5): Promise<TopBarber[]> => {
    const response = await api.get<{ success: boolean; data: TopBarber[] }>(
      `/barbers/best?limit=${limit}`
    );
    return response.data.data;
  },

  getTopWorkplaces: async (limit: number = 5): Promise<TopWorkplace[]> => {
    const response = await api.get<{ success: boolean; data: TopWorkplace[] }>(
      `/workplaces/public/best?limit=${limit}`
    );
    return response.data.data;
  },

  getBarberById: async (id: string): Promise<TopBarber> => {
    const response = await api.get<{ success: boolean; data: TopBarber }>(`/barbers/${id}`);
    return response.data.data;
  },

  getBarberServices: async (barberId: string): Promise<Service[]> => {
    const response = await api.get<{ success: boolean; data: Service[] }>(
      `/services/barber/${barberId}`
    );
    return response.data.data;
  },

  getAvailableSlots: async (barberId: string, date: string): Promise<string[]> => {
    const response = await api.get<{ success: boolean; data: AvailableSlots }>(
      `/barber-availability/${barberId}/slots?date=${date}`
    );
    return response.data.data.availableSlots;
  },

  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const response = await api.get<{ success: boolean; data: PaymentMethod[] }>(
      '/payment-methods'
    );
    return response.data.data;
  },

  createAppointment: async (data: {
    barberId: string;
    serviceId?: string;
    date: string;
    time: string;
    paymentMethod: string;
    clientName: string;
    clientPhone: string;
  }): Promise<Appointment> => {
    const response = await api.post<{ success: boolean; data: Appointment }>(
      '/appointments',
      data
    );
    return response.data.data;
  },
};

