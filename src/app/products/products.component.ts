import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductDetailComponent, AddProductComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  showAddProductForm: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get('https://api.jsoning.com/mock/public/products').subscribe((data: any) => {
      this.products = data;
    });
  }

  showProductDetail(product: any): void {
    this.selectedProduct = product;
  }

  closeProductDetail(): void {
    this.selectedProduct = null;
  }

  openAddProductForm(): void {
    this.showAddProductForm = true;
  }

  closeAddProductForm(): void {
    this.showAddProductForm = false;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
