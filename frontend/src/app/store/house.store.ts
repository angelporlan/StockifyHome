import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { House } from "../interfaces/house";

export interface HouseState {
  selectedHouse: House | null;
  houses: House[];
}

const storedData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');

const initialState: HouseState = {
  selectedHouse: storedData.selectedHouse || null,
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
    },
    setHouseSelected: (house: House) => {
      const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
 
      const updatedData = {
        ...stockifyHomeData,
        selectedHouse: house,
      };

      localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));

      patchState(store, (state) => ({
        selectedHouse: house,
      }));
    },
    resetState: () => {
      patchState(store, (state) => ({
        selectedHouse: null,
        houses: [],
      }));
    },
    deleteHouseSelected: () => {
      const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
      const updatedData = {
        ...stockifyHomeData,
        selectedHouse: null,
      };

      localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));

      patchState(store, (state) => ({
        selectedHouse: null,
      }));
    }
  }))
);
