import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Product } from "../interfaces/product";

export interface ProductState {
    selectedProducts: Product[];
}

const storedData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');

const categories = [
    { id: 1, name: "Oil, spices, and sauces" },
    { id: 2, name: "Water and soft drinks" },
    { id: 3, name: "Snacks" },
    { id: 4, name: "Rice, legumes, and pasta" },
    { id: 5, name: "Sugar, candies, and chocolate" },
    { id: 6, name: "Baby" },
    { id: 7, name: "Winery" },
    { id: 8, name: "Cocoa, coffee, and infusions" },
    { id: 9, name: "Meat" },
    { id: 10, name: "Cereals and cookies" },
    { id: 11, name: "Deli and cheese" },
    { id: 12, name: "Frozen foods" },
    { id: 13, name: "Preserves, broths, and creams" },
    { id: 14, name: "Hair care" },
    { id: 15, name: "Facial and body care" },
    { id: 16, name: "Phytotherapy and pharmacy" },
    { id: 17, name: "Fruits and vegetables" },
    { id: 18, name: "Eggs, milk, and butter" },
    { id: 19, name: "Cleaning and home" },
    { id: 20, name: "Makeup" },
    { id: 21, name: "Seafood and fish" },
    { id: 22, name: "Pets" },
    { id: 23, name: "Bakery and pastries" },
    { id: 24, name: "Desserts and yogurts" },
    { id: 25, name: "Juices" }
  ];

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
        updateProduct: (product: any) => {
            const stockifyHomeData = JSON.parse(localStorage.getItem('stockifyHomeData') || '{}');
        
            const updatedProducts = store.selectedProducts().map(p => {
                if (p.id === product.id) {
                    const category = categories.find(c => c.id === product.category_id);
                    return { ...p, name: product.name, categoryId: product.category_id, Category: category || { id: 0, name: '' } };
                }
                return p;
            });
        
            const updatedData = {
                ...stockifyHomeData,
                selectedProducts: updatedProducts,
            };
        
            localStorage.setItem('stockifyHomeData', JSON.stringify(updatedData));
        
            patchState(store, {
                selectedProducts: updatedProducts,
            });
        }
        
    }))
);