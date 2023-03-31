import { Component, OnInit } from '@angular/core';
import { Order } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orderData: Order[] | undefined;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getorderList();
  }

  cancelOrder(orderId: number | undefined){
    orderId && this.productService.cancelOrder(orderId).subscribe((result)=>{
      this.getorderList();
    })
  }

  getorderList(){
    this.productService.orderList().subscribe((result)=>{
      this.orderData = result
    })
  }

}
