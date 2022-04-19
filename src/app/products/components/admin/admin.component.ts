import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public products:IProduct[] = [];
  public errorMessage : string = '';

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    }, (error) => {
      console.log(error);
      this.errorMessage = error;
    });
  }

  // clickDeleteProduct
  public clickDeleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe((data) => {
      this.productService.getAllProducts().subscribe((data) => {
        this.products = data;
      }, (error) => {
        console.log(error);
        this.errorMessage = error;
      });
    }, (error) => {
      console.log(error);
      this.errorMessage = error;
    })
  }

}
