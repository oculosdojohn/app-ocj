import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent implements OnInit, OnChanges {
  @Input() max = 5;
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [];
  hoveredIndex = -1;

  constructor() {}

  ngOnInit() {
    this.stars = Array(this.max).fill(0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating']) {
    }
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
