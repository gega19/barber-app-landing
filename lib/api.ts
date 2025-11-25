import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bartop-p.up.railway.app/api';

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

export const appApi = {
  getActiveVersion: async (): Promise<AppVersion> => {
    const response = await api.get<{ success: boolean; data: AppVersion }>('/api/app/version');
    return response.data.data;
  },
  
  downloadApk: async (versionId: string): Promise<Blob> => {
    const response = await api.get(`/api/app/download/${versionId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  get: async (url: string) => {
    return await api.get(url);
  },

  getTopBarbers: async (limit: number = 5): Promise<TopBarber[]> => {
    const response = await api.get<{ success: boolean; data: TopBarber[] }>(
      `/api/barber/best?limit=${limit}`
    );
    return response.data.data;
  },

  getTopWorkplaces: async (limit: number = 5): Promise<TopWorkplace[]> => {
    const response = await api.get<{ success: boolean; data: TopWorkplace[] }>(
      `/api/workplace/public/best?limit=${limit}`
    );
    return response.data.data;
  },
};

