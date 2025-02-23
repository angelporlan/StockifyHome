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
        getProductsById: (id: number) => {
            return store.selectedProducts().find(product => product.id === id);
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
        },
        updateProductDetail: (productId: number, detailId: number, newQuantity: number) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
        
            const updatedProducts = store.selectedProducts().map(product => {
                if (product.id === productId) {
                    const updatedProductDetails = product.ProductDetails.map(detail => {
                        if (detail.id === detailId) {
                            return { ...detail, quantity: newQuantity };
                        }
                        return detail;
                    });
                    return { ...product, ProductDetails: updatedProductDetails };
                }
                return product;
            });
        
            const updatedData = {
                ...stockifyHomeData,
                selectedProducts: updatedProducts,
            };
        
            localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));
        
            patchState(store, () => ({
                selectedProducts: updatedProducts,
            }));
        },
        addProduct: (product: Product) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
        
            const updatedProducts = [...store.selectedProducts(), product];
        
            const updatedData = {
                ...stockifyHomeData,
                selectedProducts: updatedProducts,
            };
        
            localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));
        
            patchState(store, () => ({
                selectedProducts: updatedProducts,
            }));
        },
        addProductDetail: (productId: number, details: any[]) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
        
            const updatedProducts = store.selectedProducts().map(product => {
                if (product.id === productId) {
                    return { 
                        ...product, 
                        ProductDetails: [...product.ProductDetails, ...details] 
                    };
                }
                return product;
            });
        
            const updatedData = {
                ...stockifyHomeData,
                selectedProducts: updatedProducts,
            };
        
            localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));
        
            patchState(store, () => ({
                selectedProducts: updatedProducts,
            }));
        },
        deleteProductDetail: (productId: number, detailId: number) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
        
            const updatedProducts = store.selectedProducts().map(product => {
                if (product.id === productId) {
                    const updatedProductDetails = product.ProductDetails.filter(detail => detail.id !== detailId);
                    return { ...product, ProductDetails: updatedProductDetails };
                }
                return product;
            });
        
            const updatedData = {
                ...stockifyHomeData,
                selectedProducts: updatedProducts,
            };
        
            localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));
        
            patchState(store, () => ({
                selectedProducts: updatedProducts,
            }));
        },
        updateProduct: (product: any, translatedCategories: { id: number; name: string }[]) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
        
            const category = translatedCategories.find(c => c.id === product.category_id);
            
            const updatedProducts = store.selectedProducts().map(p => {
                if (p.id === product.id) {
                    return { 
                        ...p, 
                        name: product.name, 
                        categoryId: product.category_id, 
                        Category: category || { id: 0, name: '' } 
                    };
                }
                return p;
            });
        
            localStorage.setItem('stockifyHomeData', JSON.stringify({ ...stockifyHomeData, selectedProducts: updatedProducts }));
        
            patchState(store, { selectedProducts: updatedProducts });
        }        
        
    }))
);