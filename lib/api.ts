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
};

