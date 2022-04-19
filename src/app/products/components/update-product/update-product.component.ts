import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public productId:string;
  public selectedProduct:IProduct;
  public errorMessage:string;
  public emptyFields:boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private productService:ProductService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      this.productId = param.get('id');
    });

    this.productService.getProduct(this.productId).subscribe((data) => {
      this.selectedProduct = data;
    }, (error) => {
      console.error(error);
      this.errorMessage = error;
    });
  }

 
  // submitUpdateProduct
  public submitUpdateProduct(){
    if(this.selectedProduct.jobtitlename !== '' && this.selectedProduct.firstname !== '' && this.selectedProduct.lastname !== null &&
      this.selectedProduct.location !== null && this.selectedProduct.email !== ''){
      this.productService.updateProduct(this.selectedProduct, this.productId).subscribe((data) => {
        this.router.navigate(['/products/admin']);
      }, (error) => {
        this.errorMessage = error;
      });
    }
    else{
      this.emptyFields = true;
    }
  }

}
