import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Colaborador } from 'src/app/sistema/Administrativo/funcionarios/colaborador';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';
import { FeedbacksService } from 'src/app/services/rh/feedbacks.service';
import { Feedback } from '../../feedbaks/feedback';

@Component({
  selector: 'app-detalhes-feedback',
  templateUrl: './detalhes-feedback.component.html',
  styleUrls: ['./detalhes-feedback.component.css'],
})
export class DetalhesFeedbackComponent implements OnInit {
  feedback!: Feedback;

  selectedDepartamento: any;
  selectedCargo: any;

  constructor(
    private feedbackService: FeedbacksService,
    private route: ActivatedRoute,
    private location: Location,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.carregarFeedback();
  }

  goBack() {
    this.location.back();
  }

  getDescricaoCargo(cargo: string): string {
    return (
      CargoDescricoes[cargo as keyof typeof CargoDescricoes] ||
      'Cargo desconhecido'
    );
  }

  carregarFeedback(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.feedbackService.buscarFeedbackPorId(id).subscribe(
        (response) => {
          this.feedback = response;
          console.log('Dados de feedback carregados:', this.feedback);
        },
        (error) => {
          console.error('Erro ao carregar os dados do feedback:', error);
        }
      );
    }
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomColor(seed: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index = seed ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }
}
