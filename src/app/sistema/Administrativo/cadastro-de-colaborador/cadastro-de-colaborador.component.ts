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
import { Cargo } from '../funcionarios/enums/cargo';
import { CargoDescricoes } from '../funcionarios/enums/cargo-descricoes';
import { Nacionalidade } from '../funcionarios/enums/nacionalidade';
import { NacionalidadeDescricoes } from '../funcionarios/enums/nacionalidade-descricoes';
import { TipoContratacao } from '../funcionarios/enums/tipo-contratacao';
import { TipoContratacaoDescricoes } from '../funcionarios/enums/tipo-contratacao-descricoes';
import { PeriodoExperiencia } from '../funcionarios/enums/periodo-experiencia';
import { PeriodoExperienciaDescricoes } from '../funcionarios/enums/periodo-experiencia-descricoes';
import { Escolha } from '../funcionarios/enums/escolha';
import { EscolhaDescricoes } from '../funcionarios/enums/escolha-descricoes';
import { Usuario } from 'src/app/login/usuario';
import { Endereco } from '../lojas/endereco';
import { Colaborador } from '../funcionarios/colaborador';


@Component({
  selector: 'app-cadastro-de-colaborador',
  templateUrl: './cadastro-de-colaborador.component.html',
  styleUrls: ['./cadastro-de-colaborador.component.css'],
})
export class CadastroDeColaboradorComponent implements OnInit {
  colaboradorForm: FormGroup;
  formData = new FormData();
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  selectedImages: { [key: string]: File | null } = {};
  status: string = 'ATIVO';
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

  nacionalidades = Object.keys(Nacionalidade).map(key => ({
    value: Nacionalidade[key as keyof typeof Nacionalidade],
    description: NacionalidadeDescricoes[Nacionalidade[key as keyof typeof Nacionalidade]]
  }));
  selectedNacionalidade: string = '';

  cargos = Object.keys(Cargo).map(key => ({
    value: Cargo[key as keyof typeof Cargo],
    description: CargoDescricoes[Cargo[key as keyof typeof Cargo]]
  }));
  selectedCargo: string = '';

  tiposContratacao = Object.keys(TipoContratacao).map(key => ({
    value: TipoContratacao[key as keyof typeof TipoContratacao],
    description: TipoContratacaoDescricoes[TipoContratacao[key as keyof typeof TipoContratacao]]
  }));
  selectedTipoContratacao: string = '';

  periodosExperiencia = Object.keys(PeriodoExperiencia).map(key => ({
    value: PeriodoExperiencia[key as keyof typeof PeriodoExperiencia],
    description: PeriodoExperienciaDescricoes[PeriodoExperiencia[key as keyof typeof PeriodoExperiencia]]
  }));
  selectedPeriodoExperiencia: string = '';

  escolhas = Object.keys(Escolha).map(key => ({
    value: Escolha[key as keyof typeof Escolha],
    description: EscolhaDescricoes[Escolha[key as keyof typeof Escolha]]
  }));
  selectedFilhos: string = '';
  selectedDeficiencia: string = '';


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
      // geral
      username: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      estadoCivil: [''],
      genero: [''],
      etnia: [''],
      escolaridade: ['', Validators.required],
      curso: [''],
      nacionalidade: [''],
      naturalidade: [''],
      portadorDeficiencia: [''],
      deficiencia: [''],
      possuiFilhos: [''],
      quantidadeFilhos: [''],
      // documentos
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      orgaoExpedidor: ['', Validators.required],
      dataExpedicao: ['', Validators.required],
      nomeMae: [''],
      nomePai: [''],
      cnh: [''],
      reservista: [''],
      tituloDeEleitor: [''],
      zonaEleitoral: [''],
      secaoEleitoral: [''],
      pis: [''],
      ctpsNum: [''],
      ctpsSerie: [''],
      banco: ['', Validators.required],
      agencia: ['', Validators.required],
      contaCorrente: ['', Validators.required],
      documentos: this.formBuilder.array([]),
      // contato
      telefoneUm: [''],
      telefoneDois: [''],
      emailEmpresarial: ['', [Validators.email]],
      instagram: [''],
      // endereco
      endereco: this.formBuilder.group({
        pais: [''],
        estado: [''],
        cidade: [''],
        cep: ['', Validators.required],
        bairro: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        logradouro: [''],
        complemento: [''],
      }),
      // dados contrato
      identificadorLoja: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      identificadorDepartamento: ['', Validators.required],
      cargo: ['', Validators.required],
      tipoDeContratacao: ['', Validators.required],
      salario: ['', Validators.required],
      periodoDeExperiencia: ['', Validators.required],
      dataDoContrato: ['', Validators.required],
      // duracaoDoContrato: [''],
      dataTerminoDoContrato: ['', Validators.required],
      identificadorSuperiorResponsavel: [''],
      status: ['ATIVO', Validators.required],
      // credenciais
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

  onSubmit(): void {
    if (this.colaboradorForm.invalid) {
      console.log('Estado do formulário:', this.colaboradorForm);
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;
     // Atualiza diretamente os valores dos campos do formulário com os valores selecionados
    this.colaboradorForm.get('cargo')?.setValue(this.selectedCargo);
    this.colaboradorForm.get('loja')?.setValue(this.selectedLoja);
    this.colaboradorForm.get('departamento')?.setValue(this.selectedDepartamento);
    this.colaboradorForm.get('estadoCivil')?.setValue(this.selectedEstadoCivil);
    this.colaboradorForm.get('genero')?.setValue(this.selectedGenero);
    this.colaboradorForm.get('etnia')?.setValue(this.selectedEtnia);
    this.colaboradorForm.get('escolaridade')?.setValue(this.selectedEscolaridade);
    this.colaboradorForm.get('nacionalidade')?.setValue(this.selectedNacionalidade);
    this.colaboradorForm.get('periodoDeExperiencia')?.setValue(this.selectedPeriodoExperiencia);

    const endereco: Endereco = this.colaboradorForm.get('endereco')
      ?.value as Endereco;
    console.log('Endereço:', endereco);

    const colaborador: Colaborador = {
      ...this.colaboradorForm.value,
      endereco: endereco,
    };

    const formData = new FormData();
    formData.append('usuarioDTO', JSON.stringify(colaborador));

    this.colaboradorService.cadastrarColaborador(formData).subscribe(
      (response) => {
        this.isLoading = false;
        this.successMessage = 'Usuário cadastrada com sucesso!';
        this.errorMessage = null;
        // this.colaboradorForm.reset();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Erro ao cadastrar a Usuário.';
        this.successMessage = null;
      }
    );
  }

  isRequired(controlName: string): boolean {
    const control = this.colaboradorForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }
}
