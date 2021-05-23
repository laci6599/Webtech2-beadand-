import { ProductDTO, ProductResponseDTO } from './product-settings';

export interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export interface ProductResponse {
    _id: string;
}
export function toProducts(productResponse: ProductDTO[]): Product[] {
    return productResponse.map(dto => toProduct(dto));
}

export function toProduct(productDTO: ProductDTO): Product {
    return {
        _id: productDTO._id,
        name: productDTO.name,
        category: productDTO.category,
        price: productDTO.price,
        quantity: productDTO.quantity
    };
}

export function toCreatedProduct(productDTO: ProductResponseDTO): ProductResponse {
    return {
        _id: productDTO._id,
    };
}

