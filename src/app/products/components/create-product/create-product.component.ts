import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product:IProduct = {
    id:'',
    jobtitlename : '',
    firstname : '',
    lastname : '',
    location: '',
    phno: null,
    email: ''
  };
  public imageFileName:any;
  public errorMessage:string;
  public emptyFields:boolean;

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
  }

  // // selectProductImage
  // public selectProductImage(event){
  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     this.imageFileName = file;
  //     reader.addEventListener('load', () => {
  //       return reader.result ? this.product.image = String(reader.result) : '';
  //     });
  //   }
  // }

  // submitCreateProduct
  public submitCreateProduct(){
    if(this.product.jobtitlename !== '' && this.product.lastname !== '' && this.product.location !== null &&
      this.product.phno !== null && this.product.email !== ''){
        this.productService.createProduct(this.product).subscribe((data) => {
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
