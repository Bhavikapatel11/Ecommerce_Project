import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult: undefined | Product[];

  constructor(private activeRoute : ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log(query);
    query && this.productService.searchProducts(query).subscribe((result)=>{
      console.log(result);
      this.searchResult = result;
    })
  }

}
