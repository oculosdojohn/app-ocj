import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';

type Status = 'pessimo' | 'medio' | 'bom' | 'excelente';

@Component({
  selector: 'app-grafico-medidor',
  templateUrl: './grafico-medidor.component.html',
  styleUrls: ['./grafico-medidor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficoMedidorComponent implements OnChanges {
  @Input() acertos = 0;
  @Input() total = 0;

  /** Limiar dos rótulos (0..1) */
  @Input() thresholds = { excelente: 0.875, bom: 0.625, medio: 0.375 };

  /** Paths dos SVG dentro de /assets */
  @Input() icons: Record<Status, string> = {
    pessimo: 'assets/icones/medidor/pessimo.svg',
    medio: 'assets/icones/medidor/medio.svg',
    bom: 'assets/icones/medidor/bom.svg',
    excelente: 'assets/icones/medidor/excelente.svg',
  };

  @Input() colors = {
    pessimo: '#C62828',
    medio: '#F4B400',
    bom: '#9CCF40',
    excelente: '#2E7D32',
  };
  @Input() labels: Record<Status, string> = {
    pessimo: 'Péssimo',
    medio: 'Médio',
    bom: 'Bom',
    excelente: 'Excelente',
  };

  p = 0; // 0..1
  status: Status = 'pessimo';
  statusText = this.labels.pessimo;
  angle = -90;
  segmentPaths = { pessimo: '', medio: '', bom: '', excelente: '' };

  ngOnChanges(): void {
    this.p = Math.max(
      0,
      Math.min(1, this.total > 0 ? this.acertos / this.total : 0)
    );
    this.status =
      this.p >= this.thresholds.excelente
        ? 'excelente'
        : this.p >= this.thresholds.bom
        ? 'bom'
        : this.p >= this.thresholds.medio
        ? 'medio'
        : 'pessimo';
    this.statusText = this.labels[this.status];
    this.angle = this.p * 180 - 90;
    this.segmentPaths = this.buildArcs();
  }

  private buildArcs() {
    // 4 partes de 45°: 180 → 135 → 90 → 45 → 0
    const step = 45;
    const a0 = 180,
      a1 = a0 - step,
      a2 = a1 - step,
      a3 = a2 - step,
      a4 = 0;

    return {
      pessimo: this.arcPath(a0, a1),
      medio: this.arcPath(a1, a2),
      bom: this.arcPath(a2, a3),
      excelente: this.arcPath(a3, a4),
    };
  }

  private polar(cx: number, cy: number, r: number, deg: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) }; // “-” para arco superior
  }

  private arcPath(
    startDeg: number,
    endDeg: number,
    r = 80,
    cx = 100,
    cy = 100
  ) {
    const s = this.polar(cx, cy, r, startDeg);
    const e = this.polar(cx, cy, r, endDeg);
    return `M ${s.x.toFixed(1)},${s.y.toFixed(
      1
    )} A ${r},${r} 0 0,1 ${e.x.toFixed(1)},${e.y.toFixed(1)}`;
  }
}
