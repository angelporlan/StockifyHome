import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { House } from "../interfaces/house";

export interface HouseState {
  selectedHouse: House | null;
  houses: House[] | null;  // Cambiado de House[] a House[] | null
}

const storedData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');

const initialState: HouseState = {
  selectedHouse: storedData.selectedHouse || null,
  houses: storedData.houses || null, // Ahora se inicializa a null
};

export const HouseStore = signalStore(
  { providedIn: 'root' },
  withState<HouseState>(initialState),
  withMethods((store) => ({
    setHouses: (houses: House[] | null) => {  // Acepta null también
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
        houses: null,  // Resetting to null
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
    },
    deleteHouse: (houseId: number) => {
      const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
      const updatedData = {
        ...stockifyHomeData,
        houses: stockifyHomeData.houses ? stockifyHomeData.houses.filter((house: House) => house.id !== houseId) : null,
        selectedHouse: stockifyHomeData.selectedHouse && stockifyHomeData.selectedHouse.id === houseId ? null : stockifyHomeData.selectedHouse,
      };

      localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));

      patchState(store, (state) => ({
        houses: state.houses ? state.houses.filter((house: House) => house.id !== houseId) : null,
        selectedHouse: state.selectedHouse && state.selectedHouse.id === houseId ? null : state.selectedHouse,
      }));
    },
    updateHouse: (house: House) => {
      const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
      const updatedData = {
        ...stockifyHomeData,
        houses: stockifyHomeData.houses ? stockifyHomeData.houses.map((h: House) => h.id === house.id ? house : h) : null,
        selectedHouse: stockifyHomeData.selectedHouse && stockifyHomeData.selectedHouse.id === house.id ? house : stockifyHomeData.selectedHouse,
      };

      localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));

      patchState(store, (state) => ({
        houses: state.houses ? state.houses.map((h: House) => h.id === house.id ? house : h) : null,
        selectedHouse: state.selectedHouse && state.selectedHouse.id === house.id ? house : state.selectedHouse,
      }));
    },
    addHouse: (house: House) => {
      const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
      const updatedData = {
        ...stockifyHomeData,
        houses: stockifyHomeData.houses ? [...stockifyHomeData.houses, house] : [house],
      };

      localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));

      patchState(store, (state) => ({
        houses: state.houses ? [...state.houses, house] : [house],
      }));
    }
  }))
);
