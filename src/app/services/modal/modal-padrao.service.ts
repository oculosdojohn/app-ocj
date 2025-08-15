import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalGeralComponent } from '../../shared/modal/modal-geral/modal-geral.component';

@Injectable({ providedIn: 'root' })
export class ModalPadraoService {
  private outlet!: ViewContainerRef;
  private modalRef!: ComponentRef<ModalGeralComponent>;

  registerOutlet(outlet: ViewContainerRef): void {
    this.outlet = outlet;
  }

  openModal(
    config?: Partial<ModalGeralComponent>,
    onConfirmDelete?: () => void
  ): void {
    if (!this.outlet) throw new Error('Outlet não registrado!');
    this.outlet.clear();

    this.modalRef = this.outlet.createComponent(ModalGeralComponent);

    if (config) {
      Object.assign(this.modalRef.instance, config);
    }

    this.modalRef.instance.closeModal.subscribe(() => {
      this.closeModal();
    });

    this.modalRef.instance.confirmDelete.subscribe(() => {
      if (onConfirmDelete) onConfirmDelete();
      this.closeModal();
    });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.destroy();
    }
  }
}
