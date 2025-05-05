import { Permissao } from 'src/app/login/permissao';
import { Endereco } from '../lojas/endereco';

export class Colaborador {
  id!: string;
  foto!: { documentoUrl: string; id: number; name: string } | null;
  fotoUrl!: any;
  username!: string;
  dataNascimento!: string;
  estadoCivil!: string;
  genero!: string;
  etnia!: string;
  escolaridade!: string;
  curso!: string;
  nacionalidade!: string;
  naturalidade!: string;
  portadorDeficiencia!: string;
  deficiencia!: string;
  possuiFilhos!: string;
  quantidadeFilhos!: number;
  cpf!: string;
  rg!: string;
  orgaoExpedidor!: string;
  dataExpedicao!: string;
  nomeMae!: string;
  nomePai!: string;
  cnh!: string;
  reservista!: string;
  tituloDeEleitor!: string;
  zonaEleitoral!: string;
  secaoEleitoral!: string;
  pis!: string;
  ctpsNum!: string;
  ctpsSerie!: string;
  banco!: string;
  agencia!: string;
  contaCorrente!: string;
  documentos!: { documentoUrl: string; id: number; name: string }[];
  telefoneUm!: string;
  telefoneDois!: string;
  emailEmpresarial!: string;
  instagram!: string;
  endereco!: Endereco;
  loja!: { id: string; nome: string; endereco: { cidade: string } } | null;
  identificadorLoja!: string;
  dataAdmissao!: string;
  departamento!: { id: string; nome: string } | null;
  identificadorDepartamento!: string;
  cargo!: string;
  tipoDeContratacao!: string;
  salario!: number;
  periodoDeExperiencia!: string;
  dataDoContrato!: string;
  duracaoDoContrato!: number;
  dataTerminoDoContrato!: string;
  superiorResponsavel!: string;
  identificadorSuperiorResponsavel!: string;
  status!: string;
  emailPessoal!: string;
  password!: string;
  confirmPassword!: string;

  toJson(): string {
    return JSON.stringify({
      id: this.id,
      foto: this.foto,
      username: this.username,
      dataNascimento: this.dataNascimento,
      estadoCivil: this.estadoCivil,
      genero: this.genero,
      etnia: this.etnia,
      escolaridade: this.escolaridade,
      curso: this.curso,
      nacionalidade: this.nacionalidade,
      naturalidade: this.naturalidade,
      portadorDeficiencia: this.portadorDeficiencia,
      deficiencia: this.deficiencia,
      possuiFilhos: this.possuiFilhos,
      quantidadeFilhos: this.quantidadeFilhos,
      cpf: this.cpf,
      rg: this.rg,
      orgaoExpedidor: this.orgaoExpedidor,
      dataExpedicao: this.dataExpedicao,
      nomeMae: this.nomeMae,
      nomePai: this.nomePai,
      cnh: this.cnh,
      reservista: this.reservista,
      tituloDeEleitor: this.tituloDeEleitor,
      zonaEleitoral: this.zonaEleitoral,
      secaoEleitoral: this.secaoEleitoral,
      pis: this.pis,
      ctpsNum: this.ctpsNum,
      ctpsSerie: this.ctpsSerie,
      banco: this.banco,
      agencia: this.agencia,
      contaCorrente: this.contaCorrente,
      documentos: this.documentos.map((doc) => ({ documentoUrl: doc.documentoUrl, id: doc.id, name: doc.name })),
      telefoneUm: this.telefoneUm,
      telefoneDois: this.telefoneDois,
      emailEmpresarial: this.emailEmpresarial,
      instagram: this.instagram,
      endereco: this.endereco,
      identificadorLoja: this.identificadorLoja,
      dataAdmissao: this.dataAdmissao,
      identificadorDepartamento: this.identificadorDepartamento,
      cargo: this.cargo,
      tipoDeContratacao: this.tipoDeContratacao,
      salario: this.salario,
      periodoDeExperiencia: this.periodoDeExperiencia,
      dataDoContrato: this.dataDoContrato,
      duracaoDoContrato: this.duracaoDoContrato,
      dataTerminoDoContrato: this.dataTerminoDoContrato,
      superiorResponsavel: this.superiorResponsavel,
      identificadorSuperiorResponsavel: this.identificadorSuperiorResponsavel,
      status: this.status,
      emailPessoal: this.emailPessoal,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }
}
