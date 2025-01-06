import { Component, OnInit } from '@angular/core';
import { ServicesApisService } from 'src/app/services/services-apis.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  motivationalMessage: string =
    'Clique no botão para gerar uma mensagem motivacional em português.';

  constructor(private apiService: ServicesApisService) {}

  ngOnInit(): void {}

  getMotivationalMessage(): void {
    this.apiService.fetchMotivationalMessage().subscribe(
      (message) => (this.motivationalMessage = message),
      (error) =>
        (this.motivationalMessage =
          'Não foi possível buscar uma mensagem. Tente novamente mais tarde.')
    );
  }
}
