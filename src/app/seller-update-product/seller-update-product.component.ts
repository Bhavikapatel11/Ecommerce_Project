import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | Product;
  productMessage: undefined | string;
  //activatesroute for id in edit module
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.productService.getProduct(productId).subscribe((data)=>{
      console.log(data);
      this.productData = data;
    })
  }

  updateSubmit(data: Product){
    if(this.productData){
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage = 'Product has been updated'
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigate(['seller-home']);
    }, 2000);
  }
}
