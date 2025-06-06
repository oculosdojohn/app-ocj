import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';

@Component({
  selector: 'app-fale-com-o-dono',
  templateUrl: './fale-com-o-dono.component.html',
  styleUrls: ['./fale-com-o-dono.component.css'],
})
export class FaleComODonoComponent implements OnInit {
  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  get rotaDashboard(): string {
    if (this.cargoUsuario === Permissao.ADMIN) return '/dashboard-admin';
    if (this.cargoUsuario === Permissao.RH) return '/dashboard-rh';
    if (this.cargoUsuario === Permissao.GERENTE) return '/dashboard-gerente';
    if (
      this.cargoUsuario === Permissao.COLABORADOR ||
      this.cargoUsuario === Permissao.VENDEDOR
    )
      return '/dashboard-colaborador';
    return '/login';
  }
}
