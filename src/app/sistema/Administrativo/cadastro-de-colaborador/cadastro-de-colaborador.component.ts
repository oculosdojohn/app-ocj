import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
import { Estado, EnderecoService } from '../../../services/endereco.service';

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
  status: string = 'Ativo';
  selectedArquivos: (
    | File
    | { documentoUrl: string; id: number; name: string }
  )[] = [];
  lojas: { value: string; description: string }[] = [];
  selectedLoja: string = '';
  departamentos: { value: string; description: string }[] = [];
  selectedDepartamento: string = '';
  foto: File | null = null;
  colaboradorId: string | null = null;
  selectedFoto: { [key: string]: File | null } = {};
  fotoPreview: string | ArrayBuffer | null = null;

  estadosCivis = Object.keys(EstadoCivil).map((key) => ({
    value: EstadoCivil[key as keyof typeof EstadoCivil],
    description:
      EstadoCivilDescricoes[EstadoCivil[key as keyof typeof EstadoCivil]],
  }));
  selectedEstadoCivil: string = '';

  generos = Object.keys(Genero).map((key) => ({
    value: Genero[key as keyof typeof Genero],
    description: GeneroDescricoes[Genero[key as keyof typeof Genero]],
  }));
  selectedGenero: string = '';

  etnias = Object.keys(RacaEtnia).map((key) => ({
    value: RacaEtnia[key as keyof typeof RacaEtnia],
    description: RacaEtniaDescricoes[RacaEtnia[key as keyof typeof RacaEtnia]],
  }));
  selectedEtnia: string = '';

  escolaridades = Object.keys(Escolaridade).map((key) => ({
    value: Escolaridade[key as keyof typeof Escolaridade],
    description:
      EscolaridadeDescricoes[Escolaridade[key as keyof typeof Escolaridade]],
  }));
  selectedEscolaridade: string = '';

  nacionalidades = Object.keys(Nacionalidade).map((key) => ({
    value: Nacionalidade[key as keyof typeof Nacionalidade],
    description:
      NacionalidadeDescricoes[Nacionalidade[key as keyof typeof Nacionalidade]],
  }));
  selectedNacionalidade: string = '';

  cargos = Object.keys(Cargo).map((key) => ({
    value: Cargo[key as keyof typeof Cargo],
    description: CargoDescricoes[Cargo[key as keyof typeof Cargo]],
  }));
  selectedCargo: string = '';

  tiposContratacao = Object.keys(TipoContratacao).map((key) => ({
    value: TipoContratacao[key as keyof typeof TipoContratacao],
    description:
      TipoContratacaoDescricoes[
        TipoContratacao[key as keyof typeof TipoContratacao]
      ],
  }));
  selectedTipoContratacao: string = '';

  periodosExperiencia = Object.keys(PeriodoExperiencia).map((key) => ({
    value: PeriodoExperiencia[key as keyof typeof PeriodoExperiencia],
    description:
      PeriodoExperienciaDescricoes[
        PeriodoExperiencia[key as keyof typeof PeriodoExperiencia]
      ],
  }));
  selectedPeriodoExperiencia: string = '';

  escolhas = Object.keys(Escolha).map((key) => ({
    value: Escolha[key as keyof typeof Escolha],
    description: EscolhaDescricoes[Escolha[key as keyof typeof Escolha]],
  }));
  selectedFilhos: string = '';
  selectedDeficiencia: string = '';

  estados: { value: string; description: string }[] = [];
  cidades: { value: string; description: string }[] = [];
  selectedEstado: string = '';
  selectedCidade: string = '';

  constructor(
    private location: Location,
    private lojaService: LojaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService,
    private colaboradorService: ColaboradorService,
    private enderecoService: EnderecoService
  ) {
    this.colaboradorForm = this.formBuilder.group({
      // geral
      foto: [''],
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
      banco: [''],
      agencia: [''],
      contaCorrente: [''],
      documentos: [[]],
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
        cep: [''],
        bairro: [''],
        rua: [''],
        numero: [''],
        logradouro: [''],
        complemento: [''],
      }),
      // dados contrato
      identificadorLoja: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      identificadorDepartamento: ['', Validators.required],
      cargo: ['', Validators.required],
      tipoDeContratacao: ['', Validators.required],
      salario: [''],
      periodoDeExperiencia: ['', Validators.required],
      dataDoContrato: ['', Validators.required],
      // duracaoDoContrato: [''],
      dataTerminoDoContrato: [''],
      identificadorSuperiorResponsavel: [''],
      status: ['Ativo', Validators.required],
      // credenciais
      emailPessoal: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarLojas();
    this.carregarDepartamentos();
    this.verificarModoEdicao();
    this.carregarEstadosECidades();
    this.colaboradorForm.get('endereco.cidade')?.disable();
    this.colaboradorForm.get('quantidadeFilhos')?.disable();
    this.colaboradorForm.get('deficiencia')?.disable();
  }

  goBack() {
    this.location.back();
  }

  onImageSelected(image: File | null, tipo: string) {
    this.selectedImages[tipo] = image;
    this.colaboradorForm.get(tipo)?.setValue(image);
    console.log(`Imagem de ${tipo} selecionada:`, image);
  }

  onArquivosSelecionados(
    arquivos: (File | { id: number; name: string; documentoUrl: string })[]
  ): void {
    this.selectedArquivos = arquivos;
    this.colaboradorForm.get('documentos')?.setValue(arquivos);
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

  onEstadoChange(nome: string): void {
    const cidadeControl = this.colaboradorForm.get('endereco.cidade');

    console.log('onEstadoChange chamado com o estado:', nome);
    this.colaboradorForm.get('endereco.estado')?.setValue(nome);

    if (!nome) {
      cidadeControl?.disable();
      this.enderecoService.getTodasCidades().subscribe((cidades) => {
        this.cidades = cidades.map((cidade) => ({
          value: cidade.nome,
          description: cidade.nome,
        }));
        this.selectedCidade = '';
        cidadeControl?.setValue(null);
      });
    } else {
      cidadeControl?.enable();
      this.enderecoService.getCidadesByEstado(nome).subscribe((cidades) => {
        console.log('Cidades filtradas pelo estado:', cidades);
        this.cidades = cidades.map((cidade) => ({
          value: cidade.nome,
          description: cidade.nome,
        }));
        this.selectedCidade = '';
        cidadeControl?.setValue(null);
      });
    }
  }

  onCidadeChange(nome: string): void {
    console.log('onCidadeChange chamado com a cidade:', nome);
    this.colaboradorForm.get('endereco.cidade')?.setValue(nome);
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

    const endereco: Endereco = this.colaboradorForm.get('endereco')
      ?.value as Endereco;
    console.log('Endereço:', endereco);

    const colaborador: Colaborador = {
      ...this.colaboradorForm.value,
      endereco: endereco,
    };

    const formData = new FormData();
    formData.append('usuarioDTO', JSON.stringify(colaborador));

    const foto = this.colaboradorForm.get('foto')?.value;
    if (foto) {
      formData.append('foto', foto);
    }

    // Adiciona os documentos ao FormData
    const documentos = this.colaboradorForm.get('documentos')?.value || [];
    documentos.forEach((documento: File, index: number) => {
      formData.append(`documentos[${index}]`, documento);
    });

    if (this.isEditMode && this.colaboradorId) {
    } else {
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
  }

  isRequired(controlName: string): boolean {
    const control = this.colaboradorForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }

  private verificarModoEdicao(): void {
    this.colaboradorId = this.route.snapshot.paramMap.get('id');
    if (this.colaboradorId) {
      this.isEditMode = true;
      this.colaboradorService
        .getColaboradorById(Number(this.colaboradorId))
        .subscribe(
          (colaborador: Colaborador) => {
            console.log('Dados do usuário recebido:', colaborador);

            this.colaboradorForm.patchValue({
              ...colaborador,
              endereco: colaborador.endereco || {},
              status: colaborador.status || 'Ativo',
            });

            if (colaborador.foto && colaborador.foto.documentoUrl) {
              this.selectedFoto['foto'] = null;
              this.fotoPreview = colaborador.foto.documentoUrl;
              console.log('Foto do user carregada:', colaborador.foto);
            }

            // Atualiza o FormControl 'documentos' com os documentos recebidos
            if (colaborador.documentos) {
              this.colaboradorForm
                .get('documentos')
                ?.setValue(colaborador.documentos);
              console.log(
                'Documentos carregados no FormControl:',
                colaborador.documentos
              );
            }

            // Preenche os campos de seleção
            this.selectedCargo = colaborador.cargo;
            this.selectedEstadoCivil = colaborador.estadoCivil;
            this.selectedGenero = colaborador.genero;
            this.selectedEtnia = colaborador.etnia;
            this.selectedEscolaridade = colaborador.escolaridade;
            this.selectedNacionalidade = colaborador.nacionalidade;
            this.selectedPeriodoExperiencia = colaborador.periodoDeExperiencia;
            this.selectedTipoContratacao = colaborador.tipoDeContratacao;
            this.selectedFilhos = colaborador.possuiFilhos;
            this.selectedDeficiencia = colaborador.portadorDeficiencia;
            this.tratarLojaEDepartamento(colaborador);
          },
          (error) => {
            console.error('Erro ao carregar os dados do usuário', error);
          }
        );
    }
  }

  private tratarLojaEDepartamento(colaborador: Colaborador): void {
    if (colaborador.loja) {
      this.selectedLoja = colaborador.loja.id;
      this.lojas = [
        {
          value: colaborador.loja.id,
          description: colaborador.loja.nome,
        },
      ];
    }

    if (colaborador.departamento) {
      this.selectedDepartamento = colaborador.departamento.id;
      this.departamentos = [
        {
          value: colaborador.departamento.id,
          description: colaborador.departamento.nome,
        },
      ];
    }
  }

  private carregarEstadosECidades(): void {
    this.enderecoService.getEstados().subscribe((estados: Estado[]) => {
      this.estados = estados.map((estado: Estado) => ({
        value: estado.sigla,
        description: estado.nome,
      }));
      console.log('Estados carregados:', this.estados);
    });

    this.onEstadoChange('');
  }

  onDependenciaChange(
    controlName: string,
    dependentControlName: string,
    value: string | null
  ): void {
    const dependentControl = this.colaboradorForm.get(dependentControlName);

    if (value === 'Sim') {
      dependentControl?.enable();
    } else {
      dependentControl?.disable();
      dependentControl?.setValue(null);
    }
  }
}
