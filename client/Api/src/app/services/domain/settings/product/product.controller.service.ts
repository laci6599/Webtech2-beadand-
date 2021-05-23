import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from './product-setting.model';
import { CreateProductDTO, ProductDTO, } from './product-settings';

@Injectable()
export abstract class ProductController {
    public abstract getProducts(): Observable<ProductDTO[]>;
    public abstract createProduct(request: CreateProductDTO): Observable<ProductResponse>;
    public abstract editProduct(request: ProductDTO): Observable<ProductDTO>;
    // tslint:disable-next-line: variable-name
    public abstract deleteProduct(_id: string);
}
