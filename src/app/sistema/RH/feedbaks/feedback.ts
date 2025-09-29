export class Feedback {
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
  data!: string;
  classificacao!: string;
  comentario!: string;
  autor!: { id: string; username: string };
  dataCadastro!: string;
  tipo!: string;
}
