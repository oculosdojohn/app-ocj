export class Ferias {
  id!: string;
  loja!: { id: string; nome: string; endereco: { cidade: string } } | null;
  lojaId!: string;
  colaboradorId!: string;
  colaborador!: {
    id: string;
    username: string;
    foto: { documentoUrl: string; id: number; name: string };
    status: string;
  } | null;
  inicioAquisitivo!: string;
  fimAquisitivo!: string;
  mesReferencia!: string;
  anoReferencia!: string;
  diasGozo!: string;
  abono!: string;
  inicioFerias!: string;
  fimFerias!: string;
}
