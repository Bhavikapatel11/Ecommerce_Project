import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  
  addProductmess: string | undefined;
  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
  }

  addSubmit(data: Product){
    this.productService.addProduct(data).subscribe((result)=>{
      console.log(result);
      if(result){
        //console.log('Addedd successfully');
        this.addProductmess = 'Product Addedd successfully';

      }
      setTimeout(() => {
        this.addProductmess = undefined;
        this.route.navigate(['seller-home']);
      }, 2000);
    })
    
  }

}
