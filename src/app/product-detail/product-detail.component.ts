import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() product: any;
  @Output() close = new EventEmitter<void>();
  private ignoreClick = false;

  constructor() {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.ignoreClick) {
      this.ignoreClick = false;
      return;
    }
    const target = event.target as HTMLElement;
    if (target && !target.closest('.modal-content')) {
      this.closeDetail();
    }
  }

  closeDetail(): void {
    this.close.emit();
  }

  ngOnChanges(): void {
    this.ignoreClick = true;
  }
}
