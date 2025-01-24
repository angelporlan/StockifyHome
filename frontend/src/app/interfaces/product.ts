import { Category } from "./category"
import { ProductDetail } from "./product-detail"

export interface Product {
    id: number,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    houseId: number,
    categoryId: number,
    category: Category,
    ProductDetails: ProductDetail[]
}
