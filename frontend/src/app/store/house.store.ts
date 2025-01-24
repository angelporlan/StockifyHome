import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { House } from "../interfaces/house";

export interface HouseState {
  houses: House[];
}

const storedData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');

const initialState: HouseState = {
  houses: storedData.houses || []
};

export const HouseStore = signalStore(
    { providedIn: 'root' },
    withState<HouseState>(initialState),
    withMethods((store) => ({
      setHouses: (houses: House[]) => {
        const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
        
        const updatedData = {
          ...stockifyHomeData,
          houses: houses,
        };
        
        localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));
        
        patchState(store, (state) => ({
          houses: houses,
        }));
      }
    }))
  );
  