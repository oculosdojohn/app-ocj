export class Registro {
  id!: string;
  loja!: { id: string; nome: string; endereco: { cidade: string } } | null;
  lojaId!: string;
  colaboradorId!: string;
  usuario!: {
    id: string;
    username: string;
    foto: { documentoUrl: string; id: number; name: string };
    status: string;
  } | null;
  data!: string;
  tipo!: string;
  classificacao!: string;
  comentario!: string;
  valorQtdHs!: string;
  autor!: { id: string; username: string };
  atualizadoEm?: string;
  criadoEm?: string;
}
