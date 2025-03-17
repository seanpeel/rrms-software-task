import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartDetailComponent } from '../cart-detail/cart-detail.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule, CartDetailComponent, RouterModule],
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  carts: any[] = [];
  users: any[] = [];
  products: any[] = [];
  selectedCart: any = null;
  loading: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchCarts();
    this.fetchUsers();
    this.fetchProducts();
  }

  fetchCarts(): void {
    this.http.get('https://api.jsoning.com/mock/public/carts').subscribe((data: any) => {
      this.carts = data;
      this.mapUserNames();
    });
  }

  fetchUsers(): void {
    this.http.get('https://api.jsoning.com/mock/public/users').subscribe((data: any) => {
      this.users = data;
      this.mapUserNames();
    });
  }

  fetchProducts(): void {
    this.http.get('https://api.jsoning.com/mock/public/products').subscribe((data: any) => {
      this.products = data;
      this.mapUserNames();
    });
  }

  mapUserNames(): void {
    if (this.carts.length && this.users.length && this.products.length) {
      this.carts = this.carts
        .map(cart => {
          const user = this.users.find(user => Number(user.id) === cart.userId);
          if (user) {
            const items = cart.items.map((item: { productId: any; }) => {
              const product = this.products.find(product => Number(product.id) === item.productId);
              return {
                ...item,
                productName: product ? product.name : 'Unknown',
                productDescription: product ? product.description : 'No description available'
              };
            });
            return {
              ...cart,
              user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                city: user.city,
                state: user.state,
                zipcode: user.zipcode,
                phone: user.phone
              },
              items
            };
          }
          return null;
        })
        .filter(cart => cart !== null);
      this.loading = false;
    }
  }

  showCartDetail(cartId: number): void {
    this.selectedCart = this.carts.find(cart => cart.id === cartId);
  }

  closeCartDetail(): void {
    this.selectedCart = null;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
