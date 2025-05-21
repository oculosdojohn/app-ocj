import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ModalDeleteService } from './services/modal/modal-delete.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app-ocj';

  @ViewChild('modalOutlet', { read: ViewContainerRef, static: true })
  modalOutlet!: ViewContainerRef;

  constructor(
    private modalService: ModalDeleteService,
  ) {}

  ngAfterViewInit(): void {
    this.modalService.registerOutlet(this.modalOutlet);
  }
}
