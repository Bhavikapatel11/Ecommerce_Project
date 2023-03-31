import { Component, OnInit } from '@angular/core';
import { Product } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProduct : Product[] | undefined ;
  trendyProduct: Product[] | undefined ;

  constructor(private Productservice: ProductService) { }

  ngOnInit(): void {
    this.Productservice.popularProducts().subscribe((data)=>{
      //console.warn(data);
      this.popularProduct = data;
    })

    this.Productservice.trendyProducts().subscribe((data)=>{
      this.trendyProduct = data;
    })

    
  }

}
