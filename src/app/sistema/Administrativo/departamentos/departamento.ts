export class Departamento {
  id!: string;
  nome!: string;
  descricao!: string;
  responsaveis!:
    | {
        id: string;
        username: string;
        foto: { id: string; documentoUrl: string; nome: string } | null;
        emailPessoal: string;
        telefoneUm: string;
      }[]
    | null;
  orcamentoMensal!: number;
  quantidadeFuncionarios!: string;
  telefone!: string;
  email!: string;
  localizacao!: string;
  loja!: { id: string; nome: string; endereco: { cidade: string } } | null;
  lojaId!: string;
  colaboradores!:
    | {
        id: string;
        username: string;
        cargo: string;
        loja?: { nome: string; endereco?: { cidade: string } };
        foto: { id: string; documentoUrl: string; nome: string } | null;
      }[]
    | null;
}
