import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalQuizComponent } from '../../shared/modal/modal-quiz/modal-quiz.component';

@Injectable({ providedIn: 'root' })
export class ModalQuizzService {
  private outlet!: ViewContainerRef;
  private modalRef!: ComponentRef<ModalQuizComponent>;

  registerOutlet(outlet: ViewContainerRef): void {
    this.outlet = outlet;
  }

  openModal(config?: Partial<ModalQuizComponent>): void {
    if (!this.outlet) throw new Error('Outlet não registrado!');
    this.outlet.clear();

    this.modalRef = this.outlet.createComponent(ModalQuizComponent);

    if (config) {
      Object.assign(this.modalRef.instance, config);
    }

    this.modalRef.instance.closeModal.subscribe(() => {
      this.closeModal();
    });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.destroy();
    }
  }
}
