import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ModalDeleteService } from './services/modal/modal-delete.service';
import { ModalQuizzService } from './services/modal/modal-quizz.service';

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
    private modalQuizService: ModalQuizzService
  ) {}

  ngAfterViewInit(): void {
    this.modalService.registerOutlet(this.modalOutlet);
    this.modalQuizService.registerOutlet(this.modalOutlet);
  }
}
