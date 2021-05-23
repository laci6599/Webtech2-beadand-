import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductController } from './product.controller.service';
import { toCreatedProduct, toProducts } from './product-setting.model';
import { ProductDTO, ProductResponseDTO } from './product-settings';

@Injectable({
    providedIn: 'root',
})
export class Productervice {

    constructor(private controller: ProductController) { }

    getProducts(): Observable<ProductDTO[]> {
        return this.controller.getProducts().pipe(map((response: ProductDTO[]) => {
            return response ? toProducts(response) : null;
        }));
    }

     createProduct(name: string, category: string, price: number, quantity: number) {
        return this.controller.createProduct({name, category, price, quantity}).pipe(map((response: ProductResponseDTO) => {
            return response ? toCreatedProduct(response) : null;
        }));
     }

     // tslint:disable-next-line: variable-name
     editProduct(_id: string, name: string, category: string, price: number, quantity: number) {
         return this.controller.editProduct( { _id, name, category, price, quantity } ).pipe();
     }

     // tslint:disable-next-line: variable-name
     deleteProduct(_id: string) {
         return this.controller.deleteProduct(_id).pipe();
     }

}
