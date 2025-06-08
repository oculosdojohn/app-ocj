import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent implements OnInit {
  @Input() max = 5;
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [];
  hoveredIndex = -1;

  constructor() {}

  ngOnInit() {
    this.stars = Array(this.max).fill(0);
  }

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  setHover(index: number) {
    this.hoveredIndex = index;
  }

  clearHover() {
    this.hoveredIndex = -1;
  }
}
