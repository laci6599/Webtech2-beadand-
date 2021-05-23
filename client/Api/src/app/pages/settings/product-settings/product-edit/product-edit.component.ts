import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from 'src/app/services/domain/settings/product/product-settings';
import { Productervice } from 'src/app/services/domain/settings/product/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: ProductDTO;

  constructor(private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private service: Productervice) { }

  productFormGroup = new FormGroup({
    name: new FormControl(localStorage.getItem('name'), [Validators.required, Validators.maxLength(20)]),
    category: new FormControl(localStorage.getItem('category'), [Validators.required, Validators.maxLength(20)]),
    price: new FormControl(Number(localStorage.getItem('price')), [Validators.required, Validators.maxLength(20)]),
    quantity: new FormControl(Number(localStorage.getItem('quantity')), [Validators.required, Validators.maxLength(20)]),
  });
  productDTO: ProductDTO;

  productId = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void { }


  succes() {
    this.snackBar.open('Sikeres módosítás', 'Termék', {
      duration: 1000,
    });
  }

  editProduct() {
    this.product = {
      _id: this.productId,
      name: this.productFormGroup.get('name').value,
      category: this.productFormGroup.get('category').value,
      price: this.productFormGroup.get('price').value,
      quantity: this.productFormGroup.get('quantity').value,
    }
    this.service.editProduct(this.product._id, this.product.name, this.product.category, this.product.price, this.product.quantity).subscribe(val => {

      if (val != null) {
        this.succes();
        this.router.navigate(['settings/product']);
      }

    });
  }
s
}
