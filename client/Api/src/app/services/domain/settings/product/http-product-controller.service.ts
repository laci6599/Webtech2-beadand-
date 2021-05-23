import { HttpHeaders, HttpParameterCodec, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductController } from './product.controller.service';
import { CreateProductDTO, ProductDTO, ProductResponseDTO } from './product-settings';
import { ProductResponse } from './product-setting.model';

@Injectable()
export class HttpProductController implements ProductController {
    private readonly BASE_URL = `http://localhost:5000/api/products`;
    public defaultHeaders = new HttpHeaders();
    public encoder: HttpParameterCodec;
    constructor(private httpClient: HttpClient) { }
    public createProduct(request: CreateProductDTO): Observable<ProductResponseDTO> {
        return this.httpClient.post(`${this.BASE_URL}/add`, request).pipe(
            map((res: ProductResponse) => res)
        );
    }
    public editProduct(request: ProductDTO): Observable<ProductDTO> {
        return this.httpClient.put(`${this.BASE_URL}/${request._id}`, request).pipe(
            map((res: ProductDTO) => res)
        );
    }
    // tslint:disable-next-line: variable-name
    public deleteProduct(_id: string) {
        return this.httpClient.post(`${this.BASE_URL}/delete/${_id}`, null).pipe();
    }
    public getProducts(): Observable<ProductDTO[]> {
        return this.httpClient.post(`${this.BASE_URL}`, null).pipe(
            map((res: ProductDTO[]) => res)
        );
    }

}
