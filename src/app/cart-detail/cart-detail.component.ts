import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent {
  @Input() cart: any;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    this.closeDetail();
  }

  closeDetail(): void {
    this.close.emit();
  }
}
