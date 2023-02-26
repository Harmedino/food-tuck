import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  // product:any = []
  // private product  = new  BehaviorSubject<array>([]){

  // }
  private product:any = new BehaviorSubject<string[]>([]);
  myProductArray$ = this.product.asObservable();

  private cartQuantity = new BehaviorSubject<number>(0);
  myValue$ = this.cartQuantity.asObservable();

  setCartQuantity(newValue:number){
    this.cartQuantity.next(newValue);
  }
  updateProduct(products:any){
    this.product.next(products);
    localStorage.removeItem('cart-items');
    localStorage.setItem('cart-items',JSON.stringify(products));
  }
  public addToCart(prodct:any){
    if (this.product._value.length > 0) {
      let productArr:any = []
      productArr.push(prodct)


      console.log('producarr',productArr);
      productArr.forEach((productt: { id: any; }) => {
        let found = this.product._value.find((product: any)=>{return product.id == productt.id })
        if (!found) {
          this.product._value.push(prodct, )
        }
      });
    }else{
      this.product._value. push(prodct)
      console.log(prodct);
    }
    this.setCartQuantity(this.product._value.length)
    localStorage.setItem('cart-items',JSON.stringify(this.product._value))
  }
  getProducts(){
    let prod = JSON.parse(localStorage.getItem('cart-items') || '{}' );
    console.log('prod',prod);
    if (prod.length > 0) {
      if (this.product._value.length > 0) {
        prod.forEach((productt: { id: any; }) => {
          let found = this.product._value.find((product: any)=>{return product.id == productt.id })
          if (!found) {
            this.product._value.push(productt)
          }
        });
      }else{
        this.updateProduct(prod)
      }
    }
    this.setCartQuantity(this.product._value.length)
  }
  removeFromCart(i:any){
    this.product._value.splice(i,1)
    this.updateProduct(this.product._value)
    this.setCartQuantity(this.product._value.length)
  }
}
