import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LojaService } from '../../../services/administrativo/loja.service';
import { DepartamentoService } from '../../../services/administrativo/departamento.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { Escolaridade } from '../../Administrativo/funcionarios/enums/escolaridade';
import { EscolaridadeDescricoes } from '../funcionarios/enums/escolaridade-descricoes';
import { EstadoCivil } from '../../Administrativo/funcionarios/enums/estado-civil';
import { EstadoCivilDescricoes } from '../funcionarios/enums/estado-civil-descricoes';
import { Genero } from '../../Administrativo/funcionarios/enums/genero';
import { GeneroDescricoes } from '../funcionarios/enums/genero-descricoes';
import { RacaEtnia } from '../funcionarios/enums/raca-etnia';
import { RacaEtniaDescricoes } from '../funcionarios/enums/raca-etnia-descricoes';
import { Permissao } from 'src/app/login/permissao';
import { PermissaoDescricoes } from 'src/app/login/permissao-descricao';
import { Usuario } from 'src/app/login/usuario';


@Component({
  selector: 'app-cadastro-de-colaborador',
  templateUrl: './cadastro-de-colaborador.component.html',
  styleUrls: ['./cadastro-de-colaborador.component.css'],
})
export class CadastroDeColaboradorComponent implements OnInit {
  colaboradorForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  selectedImages: { [key: string]: File | null } = {};
  status: string = 'ativo';
  selectedArquivos: File[] = [];
  lojas: { value: string; description: string }[] = [];
  selectedLoja: string = '';
  departamentos: { value: string; description: string }[] = [];
  selectedDepartamento: string = '';

  estadosCivis = Object.keys(EstadoCivil).map(key => ({
    value: EstadoCivil[key as keyof typeof EstadoCivil],
    description: EstadoCivilDescricoes[EstadoCivil[key as keyof typeof EstadoCivil]]
  }));
  selectedEstadoCivil: string = '';

  generos = Object.keys(Genero).map(key => ({
    value: Genero[key as keyof typeof Genero],
    description: GeneroDescricoes[Genero[key as keyof typeof Genero]]
  }));
  selectedGenero: string = '';

  etnias = Object.keys(RacaEtnia).map(key => ({
    value: RacaEtnia[key as keyof typeof RacaEtnia],
    description: RacaEtniaDescricoes[RacaEtnia[key as keyof typeof RacaEtnia]]
  }));
  selectedEtnia: string = '';

  escolaridades = Object.keys(Escolaridade).map(key => ({
    value: Escolaridade[key as keyof typeof Escolaridade],
    description: EscolaridadeDescricoes[Escolaridade[key as keyof typeof Escolaridade]]
  }));
  selectedEscolaridade: string = '';

  cargos = Object.keys(Permissao).map(key => ({
    value: Permissao[key as keyof typeof Permissao],
    description: PermissaoDescricoes[Permissao[key as keyof typeof Permissao]]
  }));
  selectedCargo: string = '';


  constructor(
    private location: Location,
    private lojaService: LojaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService,
    private colaboradorService: ColaboradorService
  ) {
    this.colaboradorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      emailPessoal: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarLojas();
    this.carregarDepartamentos();
  }

  goBack() {
    this.location.back();
  }

  onImageSelected(image: File | null, tipo: string) {
    this.selectedImages[tipo] = image;
    console.log(`Imagem de ${tipo} selecionada:`, image);
  }

  onArquivosSelecionados(arquivos: File[]) {
    this.selectedArquivos = arquivos;
    console.log('Arquivos selecionados:', arquivos);
  }

  carregarLojas(): void {
    this.lojaService.getLojas().subscribe(
      (lojas) => {
        this.lojas = lojas.map((loja) => ({
          value: loja.id,
          description: loja.nome,
        }));
      },
      (error) => {
        console.error('Erro ao carregar as lojas:', error);
      }
    );
  }

  atualizarLojas(): void {
    console.log('Atualizando lista de lojas...');
    this.carregarLojas();
  }

  carregarDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe(
      (departamentos) => {
        this.departamentos = departamentos.map((departamento) => ({
          value: departamento.id,
          description: departamento.nome,
        }));
      },
      (error) => {
        console.error('Erro ao carregar as departamentos:', error);
      }
    );
  }

  onSubmit(): void {}

  isRequired(controlName: string): boolean {
    const control = this.colaboradorForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }
}
