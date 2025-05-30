export class Admissao {
  id?: number;
  foto?: { documentoUrl: string; id: number; name: string } | null;
  colaborador!: string;
  loja!: string;
  departamento!: string;
  cargo!: string;
  status!: string;
}
