import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public products:IProduct[] = [];
  public errorMessage:string = '';

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    }, (error) => {
      console.error(error);
      this.errorMessage = error;
    });
  }

}
