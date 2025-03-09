import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  private moduloImagens: { [key in Modulos]: string } = {
    [Modulos.ONBOARDING]: 'assets/imgs/cursos-img/onboarding.png',
    [Modulos.HISTORIA_SUCESSO]: 'assets/imgs/cursos-img/historia-sucesso.png',
    [Modulos.PRINCIPIOS_OTICA]: 'assets/imgs/cursos-img/principios-otica.png',
    [Modulos.SCRIPT_VENDAS]: 'assets/imgs/cursos-img/script-vendas.png',
    [Modulos.CONSEGUIR_CLIENTES]: 'assets/imgs/cursos-img/conseguir-clientes.png',
    [Modulos.CONSULTOR_ALTA_PERFORMANCE]: 'assets/imgs/cursos-img/consultor-alta-performance.png',
    [Modulos.LIMPEZA_MANUTENCAO]: 'assets/imgs/cursos-img/limpeza-manutencao.png',
    [Modulos.MANUTENCAO_OCULOS]: 'assets/imgs/cursos-img/manutencao-oculos.png',
    [Modulos.GARANTIA_PRODUTOS]: 'assets/imgs/cursos-img/garantia-produtos.png',
    [Modulos.EMBALAGEM_PADRAO]: 'assets/imgs/cursos-img/embalagem-padrao.png',
    [Modulos.ENTREGA_OCULOS_GRAU]: 'assets/imgs/cursos-img/entrega-oculos.png',
    [Modulos.PADROES_ATENDIMENTO]: 'assets/imgs/cursos-img/padroes-atendimento.png',
    [Modulos.SSOTICA_SISTEMA_VENDAS]: 'assets/imgs/cursos-img/ssotica-vendas.png',
    [Modulos.SSOTICA_CAIXA]: 'assets/imgs/cursos-img/ssotica-caixa.png',
    [Modulos.EU_SOU_VENDEDOR]: 'assets/imgs/cursos-img/eu-sou-vendedor.png',
    [Modulos.INTELIGENCIA_EMOCIONAL]: 'assets/imgs/cursos-img/inteligencia-emocional.png'
  };

  modulos = Object.keys(Modulos).map(key => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
    slug: this.generateSlug(ModulosDescricao[Modulos[key as keyof typeof Modulos]]),
    image: this.moduloImagens[Modulos[key as keyof typeof Modulos]]
  }));

  cursosPorPagina = 6;
  paginaAtual = 1;

  constructor(private router: Router) { } 

  ngOnInit(): void {
  }

  cadastrarAula(): void {
    this.router.navigate(['/usuario/cadastro-de-aulas']); 
  }

  get modulosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.cursosPorPagina;
    return this.modulos.slice(inicio, inicio + this.cursosPorPagina);
  }
  
  mudarPagina(numeroPagina: number) {
    this.paginaAtual = numeroPagina;
  }

  navegarParaModulo(modulo: string): void {
    const moduloSlug = this.modulos.find(m => m.value === modulo)?.slug;
    if (moduloSlug) {
      this.router.navigate(['/usuario/curso', moduloSlug]);
    }
  }

  generateSlug(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
