export class Ferias {
  id!: string;
  loja!: { id: string; nome: string; endereco: { cidade: string } } | null;
  lojaId!: string;
  usuarioId!: string;
  usuario!: {
    id: string;
    username: string;
    foto: { documentoUrl: string; id: number; name: string };
    status: string;
  } | null;
  inicioAquisitivo!: string;
  fimAquisitivo!: string;
  mes!: string;
  ano!: string;
  dias!: string;
  abono!: string;
  inicioFerias!: string;
  fimFerias!: string;
}
