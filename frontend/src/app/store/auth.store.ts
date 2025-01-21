import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
    token: localStorage.getItem('tokenStockifyHome') || '',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),
  withMethods((store) => ({
    setToken: (newToken: string) => {
      localStorage.setItem('tokenStockifyHome', newToken);
      patchState(store, (state) => ({
        token: newToken,
      }));
    },
    deleteToken: () => {
        localStorage.removeItem('tokenStockifyHome');
        patchState(store, (state) => ({
            token: '',
        }));
    },
  }))
);
