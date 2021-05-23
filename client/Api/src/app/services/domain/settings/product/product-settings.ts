export interface ProductDTO {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface CreateProductDTO {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface ProductResponseDTO {
  _id: string;
}
