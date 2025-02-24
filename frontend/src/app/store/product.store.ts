import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Product } from "../interfaces/product";

export interface ProductState {
    selectedProducts: Product[] | null;
}

const storedData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');

const initialState: ProductState = {
    selectedProducts: storedData.selectedProducts ?? null
};

export const ProductStore = signalStore(
    { providedIn: 'root' },
    withState<ProductState>(initialState),
    withMethods((store) => ({
        setProducts: (products: Product[] | null) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            stockifyHomeData.selectedProducts = products;

            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

            patchState(store, { selectedProducts: products });
        },
        resetState: () => {
            // Actualizar el estado del store
            patchState(store, { selectedProducts: null });
        
            // Actualizar también el almacenamiento local
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            stockifyHomeData.selectedProducts = null;
        
            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));
        },
        getProductsById: (id: number) => {
            return store.selectedProducts()?.find(product => product.id === id) || null;
        },
        deleteProduct: (id: number) => {
            if (!store.selectedProducts()) return;

            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            stockifyHomeData.selectedProducts = store.selectedProducts()?.filter(product => product.id !== id) || [];

            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

            patchState(store, { selectedProducts: stockifyHomeData.selectedProducts });
        },
        deleteProducts: () => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            stockifyHomeData.selectedProducts = [];

            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

            patchState(store, { selectedProducts: [] });
        },
        updateProductDetail: (productId: number, detailId: number, newQuantity: number) => {
            if (!store.selectedProducts()) return;

            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            stockifyHomeData.selectedProducts = store.selectedProducts()?.map(product => {
                if (product.id === productId) {
                    return { 
                        ...product, 
                        ProductDetails: product.ProductDetails.map(detail =>
                            detail.id === detailId ? { ...detail, quantity: newQuantity } : detail
                        )
                    };
                }
                return product;
            });

            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

            patchState(store, { selectedProducts: stockifyHomeData.selectedProducts });
        },
        addProduct: (product: Product) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            stockifyHomeData.selectedProducts = [...(store.selectedProducts() || []), product];

            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

            patchState(store, { selectedProducts: stockifyHomeData.selectedProducts });
        },
        addProductDetail: (productId: number, details: any[]) => {
            if (!store.selectedProducts()) return;

            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            stockifyHomeData.selectedProducts = store.selectedProducts()?.map(product => {
                if (product.id === productId) {
                    return { 
                        ...product, 
                        ProductDetails: [...product.ProductDetails, ...details] 
                    };
                }
                return product;
            });

            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

            patchState(store, { selectedProducts: stockifyHomeData.selectedProducts });
        },
        deleteProductDetail: (productId: number, detailId: number) => {
            if (!store.selectedProducts()) return;

            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            stockifyHomeData.selectedProducts = store.selectedProducts()?.map(product => {
                if (product.id === productId) {
                    return { 
                        ...product, 
                        ProductDetails: product.ProductDetails.filter(detail => detail.id !== detailId) 
                    };
                }
                return product;
            });

            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

            patchState(store, { selectedProducts: stockifyHomeData.selectedProducts });
        },
        updateProduct: (product: any, translatedCategories: { id: number; name: string }[]) => {
            if (!store.selectedProducts()) return;

            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
            const category = translatedCategories.find(c => c.id === product.category_id) || { id: 0, name: '' };

            stockifyHomeData.selectedProducts = (store.selectedProducts() || []).map(p => 
                p.id === product.id ? { ...p, name: product.name, categoryId: product.category_id, Category: category } : p
            );

            localStorage.setItem('stockifyHomeData', JSON.stringify(stockifyHomeData));

            patchState(store, { selectedProducts: stockifyHomeData.selectedProducts });
        }
    }))
);
