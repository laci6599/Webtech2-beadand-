import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateProductDTO } from 'src/app/services/domain/settings/product/product-settings';
import { Productervice } from 'src/app/services/domain/settings/product/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private router: Router, private service: Productervice) { }

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    category: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });
  product: CreateProductDTO;
  ngOnInit(): void {}

  succes = () => {
    this.snackBar.open('Sikeres létrehozás', 'Új termék', {
      duration: 1000,
    });
  }

  createProduct = () => {
    this.product = {
      name: this.productFormGroup.get('name').value,
      category: this.productFormGroup.get('category').value,
      price: this.productFormGroup.get('price').value,
      quantity: this.productFormGroup.get('quantity').value,
    }
    console.log(this.product);

    this.service.createProduct(this.product.name, this.product.category, this.product.price, this.product.quantity).subscribe(val => {
      console.log(val);

      if (val != null) {
        this.succes();
      }

    });
  }


}
