import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/services/domain/settings/product/product-setting.model';
import { Productervice } from 'src/app/services/domain/settings/product/product.service';
import { ProductCreateComponent } from './product-create/product-create.component';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.css']
})
export class ProductSettingsComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private service: Productervice) { }

  user: string;
  ELEMENT_DATA: Product[];
  displayedColumns: string[];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    
    this.user = sessionStorage.getItem('currentUser');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  ngAfterViewInit() {
    this.getAllProducts();
  }

  deleteProduct(product: Product): void {

    this.service.deleteProduct(product._id).subscribe(val => {
      console.log(val);
      alert('Sikeresen törölve!');
      this.getAllProducts();
    });

  }

  editProduct(product: Product): void {
    localStorage.setItem('name', product.name);
    localStorage.setItem('category', product.category);
    localStorage.setItem('price', product.price.toString());
    localStorage.setItem('quantity', product.quantity.toString());
    this.router.navigate(['settings/product', 'edit', product._id]);
  }

  getAllProducts(): void {
    this.service.getProducts().subscribe(val => {
      this.ELEMENT_DATA = val;
      console.log(this.ELEMENT_DATA);
      this.displayedColumns = ['name', 'category', 'price', 'quantity', 'edit', 'delete'];
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  createProduct(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllProducts();
    });
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['home', '']);
  }

}
