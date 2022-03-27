import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../shared/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products : any = [];
  public grandTotal !: number;
  public alltotle !: number;
  public counter : number=1;

  constructor(public orderService : OrderService,private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      console.log(res);
      
      this.grandTotal = this.cartService.getTotalPrice();
      this.alltotle = this.cartService.getallTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  plu(){
     this.counter+=1
  }
  inc(){
     this.counter-=1
  }
  onSubmit() {
    this.orderService.postOrder().subscribe(
      res => {
        console.log("Success");
        
      },
      err => {
        if (err.status === 422) {
          console.log("422");
        }
        else
          console.log('Something went wrong.Please contact admin.');
          
      }
    );
  }
}
