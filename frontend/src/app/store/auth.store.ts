import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { HouseStore } from './house.store';
import { inject } from 'vue';

export interface AuthState {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

const storedData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');

const initialState: AuthState = {
  token: storedData.token || '',
  id: storedData.id || 0,
  email: storedData.email || '',
  username: storedData.username || '',
  createdAt: storedData.createdAt || '',
  updatedAt: storedData.updatedAt || '',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),
  withMethods((store) => ({
    setToken: (newToken: string) => {
      const stockifyHomeData = {
        token: newToken,
        id: 0,
        email: '',
        username: '',
        createdAt: '',
        updatedAt: '',
        selectedProducts: [],
        selectedHouse: [],
        houses: []
      }

      localStorage.removeItem('stockifyHomeData');
      localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));
      patchState(store, (state) => ({
        token: newToken,
      }));
    },
    setProfile: (profile: any) => {
      
      const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
      stockifyHomeData.id = profile.id;
      stockifyHomeData.email = profile.email;
      stockifyHomeData.username = profile.username;
      stockifyHomeData.createdAt = profile.createdAt;
      stockifyHomeData.updatedAt = profile.updatedAt;
      localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

      patchState(store, (state) => ({
        id: profile.id,
        email: profile.email,
        username: profile.username,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      }));
    },
    deleteToken: () => {
      localStorage.removeItem('stockifyHomeData');

      patchState(store, (state) => ({
        token: '',
        id: 0,
        email: '',
        username: '',
        createdAt: '',
        updatedAt: '',
      }));
    },
  }))
);
