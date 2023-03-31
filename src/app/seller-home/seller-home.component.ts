import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  deleteIcon = faTrash;
  editIcon = faEdit;

  productData : undefined | Product[];
  productMessage: undefined | string;
  
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productlist();
  }

  productlist(){
    this.productService.productList().subscribe((result)=>{
      if (result) {
        this.productData = result;
      }      
    });
  }

  delete(id: number){
    this.productService.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage = 'Product is deleted';
      }
    this.productlist();
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
