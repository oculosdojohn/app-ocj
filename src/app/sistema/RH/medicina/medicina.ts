export class Medicina {
  id!: string;
  loja!: { id: string; nome: string; endereco: { cidade: string } } | null;
  usuarioId!: string;
  colaborador!: {
    id: string;
    username: string;
  } | null;
  data!: string;
  tipo!: string;
  descricao!: string;
  crmDoMedico!: string;
  nomeDoMedico!: string;
  cid10!: string;
  avaliacao!: string;
  finalizado!: string;
  apto!: string;
  dataProximoExame!: string;
  numDiasAfastado!: string;
}
