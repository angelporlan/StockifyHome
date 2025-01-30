import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Product } from "../interfaces/product";

export interface ProductState {
    selectedProducts: Product[];
}

const storedData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');

const initialState: ProductState = {
    selectedProducts: storedData.selectedProducts || []
};

export const ProductStore = signalStore(
    { providedIn: 'root' },
    withState<ProductState>(initialState),
    withMethods((store) => ({
        setProducts: (products: Product[]) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            const updatedData = {
                ...stockifyHomeData,
                selectedProducts: products,
            };

            localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));

            patchState(store, (state) => ({
                selectedProducts: products,
            }));
        },
        resetState: () => {
            patchState(store, (state) => ({
                selectedProducts: [],
            }));
        },
        deleteProduct: (id: number) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');

            const updatedProducts = store.selectedProducts().filter(product => product.id !== id);
        
            const updatedData = {
                ...stockifyHomeData,
                selectedProducts: updatedProducts,
            };
            localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));
        
            patchState(store, (state) => ({
                selectedProducts: updatedProducts,
            }));
        },
        deleteProducts: () => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
        
            const updatedData = {
                ...stockifyHomeData,
                selectedProducts: [],
            };
        
            localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));
        
            patchState(store, (state) => ({
                selectedProducts: [],
            }));
        }
    }))
);