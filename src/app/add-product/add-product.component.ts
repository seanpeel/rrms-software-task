import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      inStock: ['', Validators.required],
      rating: ['', Validators.required],
      sku: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      alert('Product added successfully!');
      this.productForm.reset();
    }
  }
}
