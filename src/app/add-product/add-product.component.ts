import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  @Output() close = new EventEmitter<void>();

  // Mapping of form control keys to display names
  fieldDisplayNames: { [key: string]: string } = {
    name: 'Name',
    price: 'Price',
    category: 'Category',
    description: 'Description',
    inStock: 'In Stock',
    rating: 'Rating',
    sku: 'SKU'
  };

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

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    this.closeForm();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      alert('Product added successfully!');
      this.productForm.reset();
      this.closeForm();
    } else {
      this.productForm.markAllAsTouched();
      const invalidFields = Object.keys(this.productForm.controls)
        .filter(key => this.productForm.get(key)!.invalid)
        .map(key => this.fieldDisplayNames[key]);
      alert(`Please fill out the following required fields: ${invalidFields.join(', ')}`);
    }
  }

  closeForm(): void {
    this.close.emit();
  }
}
