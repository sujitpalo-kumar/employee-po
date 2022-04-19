import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {IProduct} from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  // Get all products
  public getAllProducts():Observable<IProduct[]>{
    let dataURL = 'http://127.0.0.1:5000/api/products/';
    return this.httpClient.get<IProduct[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Get a Single Product
  public getProduct(productId):Observable<IProduct>{
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.get<IProduct>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Create a Product
  public createProduct(product:IProduct):Observable<IProduct>{
    let dataURL = `http://127.0.0.1:5000/api/products/`;
    return this.httpClient.post<IProduct>(dataURL, product).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Update a Product
  public updateProduct(product:IProduct , productId:string):Observable<IProduct>{
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.put<IProduct>(dataURL, product).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Delete a Product
  public deleteProduct(productId:string):Observable<IProduct>{
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.delete<IProduct>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      // client Error
      errorMessage = `Error : ${error.error.message}`
    }
    else{
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
